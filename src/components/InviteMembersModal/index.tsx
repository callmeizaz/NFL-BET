import { Formik, Field, FormikProps, FieldArray } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { reverse } from "named-urls";
import useClipboard from "react-use-clipboard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { AppDispatch, useAppDispatch } from "../../redux/store";

import Select from "react-select";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

import { TextField } from "formik-material-ui";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import DialogTitle from "../DialogTitle";

import { inviteMembersSchema } from "../../constants/schemas/league";

import { doAsyncLeagueInvite } from "../../redux/thunks/leagues";

import { InviteMemberModalProps, InviteMemberForm } from "./interfaces";
import useStyles from "./styles";
import routes from "./../../constants/routes";

const InviteMembersModal = (props: InviteMemberModalProps) => {
  const theme = useTheme();
  const classes = useStyles();
  let location = useLocation();
  const domain = window.location.origin;
  const { enqueueSnackbar } = useSnackbar();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch: AppDispatch = useAppDispatch();
  const { open, handleClose, league } = props;
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
      onSubmit={(values: InviteMemberForm, { setSubmitting, resetForm }) => {
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
            handleClose(false);
            enqueueSnackbar("League invites sent successfully.", {
              variant: "success",
            });
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
              ?.filter((team) => {
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
          <form>
            <Dialog
              open={open}
              onClose={() => handleClose(false)}
              fullWidth
              maxWidth="sm"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle onClose={() => handleClose(false)}>
                Invite Members
              </DialogTitle>

              <DialogContent>
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
              </DialogContent>
              <DialogActions>
                <Grid
                  container
                  item
                  xs={12}
                  direction="row"
                  justify="space-between"
                >
                  <Grid item xs={12} sm={6} md={6} lg={5} className="mt-2 px-2">
                    <Button
                      type="submit"
                      fullWidth
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
                      {isCopied ? "Copied" : "Copy Public Invite Link"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} className="mt-2 px-2">
                    <Button
                      fullWidth
                      type="submit"
                      onClick={() => {
                        handleSubmit();
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Invite
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};
export default InviteMembersModal;
