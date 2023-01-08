import React, { Fragment, useEffect } from "react";
import { Formik, Field, FormikProps, FieldArray, Form } from "formik";
import { reverse } from "named-urls";
import { useSnackbar } from "notistack";
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
// import { CometChat } from "@cometchat-pro/chat";
import { Helmet } from "react-helmet";
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
  makeStyles,
} from "@material-ui/core";
import useClipboard from "react-use-clipboard";
import Select from "react-select";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField } from "formik-material-ui";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  doAsyncLeagueInvite,
  fetchAsyncLeagueById,
  fetchAsyncLeagues,
} from "../../redux/thunks/leagues";

import routes from "../../constants/routes";

import { inviteMembersSchema } from "../../constants/schemas/league";
import { InviteMemberForm } from "../../components/InviteMembersModal/interfaces";

import { selectCurrentLeague } from "../../redux/selectors/leagues";
import { selectUserData } from "../../redux/selectors/authentication";
import { APP_ENV } from "../../constants/config";

const ImportInvite = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const league = useAppSelector(selectCurrentLeague);
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    dispatch(fetchAsyncLeagueById({ id: id }));
  }, [id]);

  useEffect(() => {
    if (league !== null) {
      const id = league.userId;
      const uid = `${APP_ENV}_${id}`;
      dispatch(fetchAsyncLeagues());

      const GUID = league.inviteToken;
      const groupName = league.name;
      // const groupType = CometChat.GROUP_TYPE.PUBLIC;
      const password = "";

      // var group = new CometChat.Group(GUID, groupName, groupType, password);
      // CometChat.createGroup(group).then(
      //   (group) => {
      //     console.log("Group created successfully:", group);
      //   },
      //   (error) => {
      //     console.log("Group creation failed with exception:", error);
      //   }
      // );

      // let membersList = [
      //   new CometChat.GroupMember(
      //     userData.username,
      //     CometChat.GROUP_MEMBER_SCOPE.ADMIN
      //   ),
      // ];

      // CometChat.addMembersToGroup(GUID, membersList, []).then(
      //   (response) => {
      //     console.log("Member Added as group admin", response);
      //   },
      //   (error) => {
      //     console.log("Failed to add member to group", error);
      //   }
      // );
    }
  }, [league]);

  const { token } = useParams<{ token: string }>();

  const domain = window.location.origin;
  const publicInvite = `${domain}${reverse(
    `${routes.dashboard.league.publicInvitation}`,
    {
      token: league?.inviteToken,
    }
  )}`;
  const [isCopied, setCopied] = useClipboard(publicInvite, {
    successDuration: 2000,
  });

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | League Import</title>
      </Helmet>
      <Grid container justify="center" className="w-full mt-24">
        <Grid item xs={12} md={10} lg={8}>
          <Box className="my-8">
            <Typography variant="h4" align="center">
              Congratulations League Admin!
            </Typography>
            <Typography variant="h6" align="center">
              Your League "{league?.name}" has been successfully imported.
              <br></br>
              Now invite your friends to your league!
            </Typography>

            <Divider className="my-8" />
            <Grid container>
              <Grid item xs={12} md={6} lg={8} container alignContent="center">
                <Typography variant="body1">
                  Invite Members via public Link
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4} container justify="flex-end">
                <Button
                  onClick={() => {
                    setCopied();
                    enqueueSnackbar(
                      "League invite copied to clipboard. Any person with this link will be able to join your league",
                      {
                        variant: "default",
                      }
                    );
                  }}
                  variant="outlined"
                  color={isCopied ? "secondary" : "primary"}
                >
                  {isCopied ? "Copied" : "Copy Invite Link"}
                </Button>
              </Grid>
            </Grid>
            <Divider className="my-8" />
            <Typography variant="body1">
              Invite Members via their email ids
            </Typography>
          </Box>
          <Formik
            initialValues={{
              invitees: [
                {
                  email: "",
                  team: null,
                },
              ],
            }}
            validationSchema={inviteMembersSchema}
            enableReinitialize
            onSubmit={(
              values: InviteMemberForm,
              { setSubmitting, resetForm }
            ) => {
              setSubmitting(true);
              const requestPayload = {
                leagueId: league.id,
                invitees: values.invitees.map((invitee) => {
                  const { email, team } = invitee;
                  return {
                    email: email,
                    teamId: team ? team.value?.teamId : null,
                  };
                }),
              };

              dispatch(doAsyncLeagueInvite(requestPayload)).then((response) => {
                setSubmitting(false);
                if (response.type == "league/invite/fulfilled") {
                  resetForm();
                  enqueueSnackbar("League invites sent successfully.", {
                    variant: "success",
                  });
                  setTimeout(() => {
                    history.push(
                      reverse(`${routes.dashboard.league.manage}#info`, {
                        id: league?.id,
                      })
                    );
                  }, 1000);
                } else {
                  return;
                }
              });
            }}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
            }: FormikProps<InviteMemberForm>) => {
              const addNewInvitee = () => {
                setFieldValue(
                  "invitees",
                  [
                    ...values.invitees,
                    {
                      email: "",
                      team: null,
                    },
                  ],
                  false
                );
              };

              const deleteInvitee = (index: number) => {
                const inviteesArray = values.invitees;
                inviteesArray.splice(index, 1);
                setFieldValue("invitees", inviteesArray, false);
              };

              const selectedTeams = values.invitees.map((invitee) => {
                return invitee?.team?.value.teamId;
              });

              const teamDropdown = league
                ? league.teams
                    ?.filter((team: any) => {
                      return team.userId === null;
                    })
                    // .filter((team) => {
                    //   return !selectedTeams.includes(team.id);
                    // })
                    .map((team: any) => {
                      return {
                        label: team.name,
                        value: {
                          teamId: team.id,
                          teamName: team.name,
                          userId: team.userId,
                        },
                      };
                    })
                : [];

              let numberOfInvitees = 1;

              const calculateNumberOfInvitees = (count: number) => {
                numberOfInvitees = count - 1;
              };

              return (
                <Form>
                  <FieldArray name="invitees">
                    {() =>
                      values.invitees.map((invite, i) => {
                        const isLast = i === values.invitees.length - 1;
                        const isFirst = i === 0;
                        return (
                          <Grid
                            container
                            item
                            direction="row"
                            justify="space-evenly"
                            alignItems="stretch"
                            xs={12}
                            className="mb-5"
                          >
                            <Grid item xs={12} md={5} className="py-1 md:pr-2">
                              <Field
                                component={TextField}
                                size="small"
                                label="Add Email Address"
                                variant="outlined"
                                name={`invitees.${i}.email`}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} md={5} className="py-1 lg:px-2">
                              <Select
                                placeholder="Select team..."
                                isClearable
                                name={`invitees.${i}.team`}
                                menuPortalTarget={document.body}
                                options={teamDropdown}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    backgroundColor: "none",
                                    minHeight: "40px",
                                    fontSize: "1rem",
                                  }),
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                  singleValue: (base) => ({
                                    ...base,
                                    width: "100%",
                                  }),
                                }}
                                onChange={(selectedTeam) => {
                                  setFieldValue(
                                    `invitees.${i}.team`,
                                    selectedTeam
                                  );
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={1}
                              container
                              justify="flex-end"
                            >
                              <Grid item>
                                {isFirst ? (
                                  <IconButton
                                    onClick={() => addNewInvitee()}
                                    disableRipple
                                  >
                                    <AddIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={() => deleteInvitee(i)}
                                    disableRipple
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })
                    }
                  </FieldArray>
                  <Grid
                    container
                    item
                    xs={12}
                    direction="row"
                    justify="space-between"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={5}
                      className="mt-2 px-2"
                    ></Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      className="mt-2 px-2"
                    >
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Invite
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
          <Box className="my-8">
            <Divider className="my-8" />
            <Grid container>
              <Grid item xs={12} md={6} lg={8} container alignContent="center">
                <Typography variant="body1">
                  You can always invite friends later in your league's info tab.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4} container justify="flex-end">
                <Button
                  component={RouterLink}
                  to={reverse(`${routes.dashboard.league.manage}#info`, {
                    id: league?.id,
                  })}
                  color="primary"
                >
                  Skip Invite
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ImportInvite;
