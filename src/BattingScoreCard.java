import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class BattingScoreCard extends JFrame{
    private JPanel panelMain;
    private String TeamName;
    private String[] playerNames;
    private String[] playerIDs;
    private JTextField txtRunsPlayer1;
    private JTextField txtBallsPlayer1;
    private JTextField txt4sPlayer1;
    private JTextField txt6sPlayer1;
    private JTextField txtRunsPlayer2;
    private JTextField txtBallsPlayer2;
    private JTextField txt4sPlayer2;
    private JTextField txt6sPlayer2;
    private JTextField txtRunsPlayer3;
    private JTextField txtBallsPlayer3;
    private JTextField txt4sPlayer3;
    private JTextField txt6sPlayer3;
    private JCheckBox checkBox1;
    private JLabel lblPlayer1;
    private JLabel lblPlayer2;
    private JLabel lblPlayer3;
    private JLabel lblPlayer4;
    private JLabel lblPlayer5;
    private JLabel lblPlayer6;
    private JLabel lblPlayer7;
    private JLabel lblPlayer8;
    private JLabel lblPlayer9;
    private JLabel lblPlayer10;
    private JLabel lblPlayer11;
    private JTextField txtRunsPlayer4;
    private JTextField txtRunsPlayer5;
    private JTextField txtRunsPlayer6;
    private JTextField txtRunsPlayer7;
    private JTextField txtRunsPlayer8;
    private JTextField txtRunsPlayer9;
    private JTextField txtRunsPlayer10;
    private JTextField txtRunsPlayer11;
    private JTextField txtBallsPlayer4;
    private JTextField txtBallsPlayer5;
    private JTextField txtBallsPlayer6;
    private JTextField txtBallsPlayer7;
    private JTextField txtBallsPlayer8;
    private JTextField txtBallsPlayer9;
    private JTextField txtBallsPlayer10;
    private JTextField txtBallsPlayer11;
    private JTextField txt4sPlayer4;
    private JTextField txt4sPlayer5;
    private JTextField txt4sPlayer6;
    private JTextField txt4sPlayer7;
    private JTextField txt4sPlayer8;
    private JTextField txt4sPlayer9;
    private JTextField txt4sPlayer10;
    private JTextField txt4sPlayer11;
    private JTextField txt6sPlayer4;
    private JTextField txt6sPlayer5;
    private JTextField txt6sPlayer6;
    private JTextField txt6sPlayer7;
    private JTextField txt6sPlayer8;
    private JTextField txt6sPlayer9;
    private JTextField txt6sPlayer10;
    private JTextField txt6sPlayer11;
    private JCheckBox checkBox2;
    private JCheckBox checkBox3;
    private JCheckBox checkBox4;
    private JCheckBox checkBox5;
    private JCheckBox checkBox6;
    private JCheckBox checkBox7;
    private JCheckBox checkBox8;
    private JCheckBox checkBox9;
    private JCheckBox checkBox10;
    private JCheckBox checkBox11;
    private JButton btnContinue;
    private JLabel lblTeamName;
    private JTable tableBatting;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public void setPlayerNames(String[] playerNames) {
        this.playerNames = playerNames;

        // set the player names labels
        setPlayerNamesLabels();
    }

    public void setPlayerIDs(String[] playerIDs) {
        this.playerIDs = playerIDs;
    }

    public void setTeamName(String teamName) {
        this.TeamName = teamName;
        // set the team name
        lblTeamName.setText(this.TeamName);
    }

    public BattingScoreCard() {
        btnContinue.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int[] runs = getRuns();
                int[] balls = getBalls();
                int[] fours = getFours();
                int[] sixes = getSixes();
                Boolean[] outs = getOuts();

                // now we have to insert everything into the DB
                insertIntoDB(runs, balls, fours, sixes, outs);

                // display success message and close the form
                dispose();
            }
        });
    }

    public void incrementNoMatches(String[] playerNames) {
        String query = "UPDATE PlayerStats SET noMatches = COALESCE(noMatches, 0) + 1 WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameter for the prepared statement
                stmt.setString(1, playerNames[i]);

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("NoMatches updated successfully for player: " + playerNames[i]);
                } else {
                    System.out.println("NoMatches not updated for player: " + playerNames[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }




    public void setBattingAvg(int[] runs) {
        // Create a new array to store the updated runs
        int[] runsUpdated = new int[11];
        System.arraycopy(runs, 0, runsUpdated, 0, 11);

        int[] previousRuns = new int[11];

        // Retrieve previous runs from the database
        String query = "SELECT RUNS FROM PLAYERSTATS WHERE PLAYERID = ?";
        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameter for the prepared statement
                stmt.setString(1, playerIDs[i]);

                try (ResultSet resultSet = stmt.executeQuery()) {
                    // Check if there is a result
                    if (resultSet.next()) {
                        previousRuns[i] = resultSet.getInt("RUNS");
                    } else {
                        // If no result, default to 0
                        previousRuns[i] = 0;
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // now add previous runs array and runsUpdated array without modifying the original runs array
        for (int i = 0; i < 11; i++) {
            runsUpdated[i] += previousRuns[i];
        }

        int[] noMatches = getNoMatches(playerIDs);
        double[] average = new double[11];

        // calculate the avg
        for (int i = 0; i < 11; i++) {
            average[i] = (double) runsUpdated[i] / noMatches[i];
        }

        // update the batting average in db
        updateBattingAvg(average);
    }

    public void updateBattingAvg(double[] battingAverage) {
        String query = "UPDATE PlayerStats SET battingAvg = ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setDouble(1, battingAverage[i]);
                stmt.setString(2, playerIDs[i]);

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("BattingAvg updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("BattingAvg not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public int[] getNoMatches(String[] playerIDs) {
        int[] noMatches = new int[11];
        String query = "SELECT noMatches FROM PlayerStats WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameter for the prepared statement
                stmt.setString(1, playerIDs[i]);

                try (ResultSet resultSet = stmt.executeQuery()) {
                    // Check if there is a result
                    if (resultSet.next()) {
                        noMatches[i] = resultSet.getInt("noMatches");
                    } else {
                        // If no result, default to 0
                        noMatches[i] = 0;
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return noMatches;
    }

    public void setRuns(int[] runs) {
        String query = "UPDATE PlayerStats SET runs = COALESCE(runs, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, runs[i]);
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Runs updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Runs not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void setBalls(int[] balls) {
        String query = "UPDATE PlayerStats SET balls = COALESCE(balls, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, balls[i]);
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Balls updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Balls not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void setFours(int[] fours) {
        String query = "UPDATE PlayerStats SET fours = COALESCE(fours, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, fours[i]);
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Fours updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Fours not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void setSixes(int[] sixes) {
        String query = "UPDATE PlayerStats SET sixes = COALESCE(sixes, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, sixes[i]);
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Sixes updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Sixes not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void setSR(int[] runs, int[] balls){
        // get the previous runs
        // Create a new array to store the updated runs
        int[] runsUpdated = new int[11];
        System.arraycopy(runs, 0, runsUpdated, 0, 11);

        int[] previousRuns = new int[11];

        // Retrieve previous runs from the database
        String query = "SELECT RUNS FROM PLAYERSTATS WHERE PLAYERID = ?";
        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameter for the prepared statement
                stmt.setString(1, playerIDs[i]);

                try (ResultSet resultSet = stmt.executeQuery()) {
                    // Check if there is a result
                    if (resultSet.next()) {
                        previousRuns[i] = resultSet.getInt("RUNS");
                    } else {
                        // If no result, default to 0
                        previousRuns[i] = 0;
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // now add previous runs array and runsUpdated array without modifying the original runs array
        for (int i = 0; i < 11; i++) {
            runsUpdated[i] += previousRuns[i];
        }

        // get the previous balls
        // Create a new array to store the updated balls
        int[] ballsUpdated = new int[11];
        System.arraycopy(balls, 0, ballsUpdated, 0, 11);

        int[] previousBalls = new int[11];

        // Retrieve previous balls from the database
        String ballsQuery = "SELECT BALLS FROM PLAYERSTATS WHERE PLAYERID = ?";
        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(ballsQuery)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameter for the prepared statement
                stmt.setString(1, playerIDs[i]);

                try (ResultSet resultSet = stmt.executeQuery()) {
                    // Check if there is a result
                    if (resultSet.next()) {
                        previousBalls[i] = resultSet.getInt("BALLS");
                    } else {
                        // If no result, default to 0
                        previousBalls[i] = 0;
                    }
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // now add previous balls array and ballsUpdated array without modifying the original balls array
        for (int i = 0; i < 11; i++) {
            ballsUpdated[i] += previousBalls[i];
        }

        double[] strikeRate = new double[11];

        for (int i = 0; i < 11; i++) {
            if (ballsUpdated[i] > 0) {
                // calculate SR
                strikeRate[i] = ((double) runsUpdated[i] / ballsUpdated[i]) * 100;
            } else {
                // Handle cases where totalBalls is zero to avoid division by zero
                strikeRate[i] = 0.0;
            }
            // output SR
            System.out.println("Player " + playerIDs[i] + "'s strike rate is: " + strikeRate[i] + "%");
        }

        updateStrikeRateInDatabase(strikeRate);
    }

    public void updateStrikeRateInDatabase(double[] strikeRate) {
        // Assuming you have arrays for playerIDs and strikeRate
        String updateQuery = "UPDATE PlayerStats SET SR = ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(updateQuery)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setDouble(1, strikeRate[i]);
                stmt.setString(2, playerIDs[i]);

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Strike Rate updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Strike Rate not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



    public void insertToPlayerStatsTable(int[] runs, int[] balls, int[] fours, int[] sixes, Boolean[] outs){
        incrementNoMatches(playerIDs);

        setBattingAvg(runs);
        setRuns(runs);
        setBalls(balls);
        setFours(fours);
        setSixes(sixes);
        setSR(runs, balls);
//
//        String format = MainMenuNewMatch.format;
    }

    public void insertIntoDB(int[] runs, int[] balls, int[] fours, int[] sixes, Boolean[] outs){
        // insert into player stats table
        insertToPlayerStatsTable(runs, balls, fours, sixes, outs);
    }

    public int[] getRuns() {
        JTextField[] runsTextFields = {
                txtRunsPlayer1, txtRunsPlayer2, txtRunsPlayer3, txtRunsPlayer4,
                txtRunsPlayer5, txtRunsPlayer6, txtRunsPlayer7, txtRunsPlayer8,
                txtRunsPlayer9, txtRunsPlayer10, txtRunsPlayer11
        };

        return getNumericValues(runsTextFields);
    }


    public int[] getNumericValues(JTextField[] textFields) {
        int[] values = new int[11];

        for (int i = 0; i < 11; i++) {
            values[i] = parseNumericValue(textFields[i].getText());
        }

        return values;
    }

    private int parseNumericValue(String input) {
        try {
            return input.isEmpty() ? 0 : Integer.parseInt(input);
        } catch (NumberFormatException e) {
            // Handle the case where parsing fails, e.g., if the input is not a valid integer
            return 0;
        }
    }


    public int[] getBalls() {
        JTextField[] ballsTextFields = {
                txtBallsPlayer1, txtBallsPlayer2, txtBallsPlayer3, txtBallsPlayer4,
                txtBallsPlayer5, txtBallsPlayer6, txtBallsPlayer7, txtBallsPlayer8,
                txtBallsPlayer9, txtBallsPlayer10, txtBallsPlayer11
        };

        return getNumericValues(ballsTextFields);
    }

    public int[] getFours() {
        JTextField[] foursTextFields = {
                txt4sPlayer1, txt4sPlayer2, txt4sPlayer3, txt4sPlayer4,
                txt4sPlayer5, txt4sPlayer6, txt4sPlayer7, txt4sPlayer8,
                txt4sPlayer9, txt4sPlayer10, txt4sPlayer11
        };

        return getNumericValues(foursTextFields);
    }

    public int[] getSixes() {
        JTextField[] sixesTextFields = {
                txt6sPlayer1, txt6sPlayer2, txt6sPlayer3, txt6sPlayer4,
                txt6sPlayer5, txt6sPlayer6, txt6sPlayer7, txt6sPlayer8,
                txt6sPlayer9, txt6sPlayer10, txt6sPlayer11
        };

        return getNumericValues(sixesTextFields);
    }


    public Boolean[] getOuts(){
        Boolean[] outs = new Boolean[11];
        outs[0] = checkBox1.isSelected();
        outs[1] = checkBox2.isSelected();
        outs[2] = checkBox3.isSelected();
        outs[3] = checkBox4.isSelected();
        outs[4] = checkBox5.isSelected();
        outs[5] = checkBox6.isSelected();
        outs[6] = checkBox7.isSelected();
        outs[7] = checkBox8.isSelected();
        outs[8] = checkBox9.isSelected();
        outs[9] = checkBox10.isSelected();
        outs[10] = checkBox11.isSelected();

        return outs;
    }

    public void setPlayerNamesLabels(){
        lblPlayer1.setText(playerNames[0]);
        lblPlayer2.setText(playerNames[1]);
        lblPlayer3.setText(playerNames[2]);
        lblPlayer4.setText(playerNames[3]);
        lblPlayer5.setText(playerNames[4]);
        lblPlayer6.setText(playerNames[5]);
        lblPlayer7.setText(playerNames[6]);
        lblPlayer8.setText(playerNames[7]);
        lblPlayer9.setText(playerNames[8]);
        lblPlayer10.setText(playerNames[9]);
        lblPlayer11.setText(playerNames[10]);
    }
}
