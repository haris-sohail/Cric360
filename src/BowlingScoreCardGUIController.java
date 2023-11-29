import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;

public class BowlingScoreCardGUIController extends JFrame{
    private JPanel panelMain;
    private String TeamName;
    private String[] playerNames;
    private String[] playerIDs;
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
    private JTextField txtRunsPlayer1;
    private JTextField txtRunsPlayer2;
    private JTextField txtRunsPlayer3;
    private JTextField txtRunsPlayer4;
    private JTextField txtRunsPlayer5;
    private JTextField txtRunsPlayer6;
    private JTextField txtRunsPlayer7;
    private JTextField txtRunsPlayer8;
    private JTextField txtRunsPlayer9;
    private JTextField txtRunsPlayer10;
    private JTextField txtRunsPlayer11;
    private JTextField txtBallsPlayer1;
    private JTextField txtBallsPlayer2;
    private JTextField txtBallsPlayer3;
    private JTextField txtBallsPlayer4;
    private JTextField txtBallsPlayer5;
    private JTextField txtBallsPlayer6;
    private JTextField txtBallsPlayer7;
    private JTextField txtBallsPlayer8;
    private JTextField txtBallsPlayer9;
    private JTextField txtBallsPlayer10;
    private JTextField txtBallsPlayer11;
    private JTextField txtWicketsPlayer1;
    private JTextField txtWicketsPlayer2;
    private JTextField txtWicketsPlayer3;
    private JTextField txtWicketsPlayer4;
    private JTextField txtWicketsPlayer5;
    private JTextField txtWicketsPlayer6;
    private JTextField txtWicketsPlayer7;
    private JTextField txtWicketsPlayer8;
    private JTextField txtWicketsPlayer9;
    private JTextField txtWicketsPlayer10;
    private JTextField txtWicketsPlayer11;
    private JTextField txtBowlingAvgPlayer1;
    private JTextField txtBowlingAvgPlayer2;
    private JTextField txtBowlingAvgPlayer3;
    private JTextField txtBowlingAvgPlayer4;
    private JTextField txtBowlingAvgPlayer5;
    private JTextField txtBowlingAvgPlayer6;
    private JTextField txtBowlingAvgPlayer7;
    private JTextField txtBowlingAvgPlayer8;
    private JTextField txtBowlingAvgPlayer9;
    private JTextField txtBowlingAvgPlayer10;
    private JTextField txtBowlingAvgPlayer11;
    private JTextField txtEconomyPlayer1;
    private JTextField txtEconomyPlayer2;
    private JTextField txtEconomyPlayer3;
    private JTextField txtEconomyPlayer4;
    private JTextField txtEconomyPlayer5;
    private JTextField txtEconomyPlayer6;
    private JTextField txtEconomyPlayer7;
    private JTextField txtEconomyPlayer8;
    private JTextField txtEconomyPlayer9;
    private JTextField txtEconomyPlayer10;
    private JTextField txtEconomyPlayer11;
    private JLabel lblTeamName;
    private JButton btnContinue;

    public BowlingScoreCardGUIController() {
        btnContinue.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int[] runsConceded = getRunsConceded();
                int[] ballsBowled = getBallsBowled();
                int[] wicketsTaken = getWicketsTaken();

                // insert into Db
                insertIntoDb(runsConceded, ballsBowled, wicketsTaken);
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

    public void setRunsConceded(int[] runsConceded) {
        String query = "UPDATE PlayerStats SET runsConceded = COALESCE(runsConceded, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setDouble(1, runsConceded[i]); // Assuming runsConceded is a double[]
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("RunsConceded updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("RunsConceded not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void setBallsBowled(int[] balls) {
        String query = "UPDATE PlayerStats SET ballsBowled = COALESCE(ballsBowled, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, balls[i]); // Assuming balls is an int[]
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("BallsBowled updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("BallsBowled not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void setWicketsTaken(int[] wicketsTaken) {
        String query = "UPDATE PlayerStats SET wicketsTaken = COALESCE(wicketsTaken, 0) + ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setInt(1, wicketsTaken[i]); // Assuming wicketsTaken is an int[]
                stmt.setString(2, playerIDs[i]); // Assuming you have playerIDs array

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("WicketsTaken updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("WicketsTaken not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public double getRunsConcededForPlayer(String playerID) {
        double runsConceded = 0.0;

        String query = "SELECT COALESCE(runsConceded, 0) AS runsConceded FROM PlayerStats WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, playerID);

            try (ResultSet resultSet = stmt.executeQuery()) {
                if (resultSet.next()) {
                    runsConceded = resultSet.getDouble("runsConceded");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return runsConceded;
    }

    public int getWicketsTakenForPlayer(String playerID) {
        int wicketsTaken = 0;

        String query = "SELECT COALESCE(wicketsTaken, 0) AS wicketsTaken FROM PlayerStats WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, playerID);

            try (ResultSet resultSet = stmt.executeQuery()) {
                if (resultSet.next()) {
                    wicketsTaken = resultSet.getInt("wicketsTaken");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return wicketsTaken;
    }

    public int getBallsBowledForPlayer(String playerID) {
        int ballsBowled = 0;

        String query = "SELECT COALESCE(ballsBowled, 0) AS ballsBowled FROM PlayerStats WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, playerID);

            try (ResultSet resultSet = stmt.executeQuery()) {
                if (resultSet.next()) {
                    ballsBowled = resultSet.getInt("ballsBowled");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ballsBowled;
    }



    public void setBowlingAvg() {
        double[] runsConceded = new double[11];

        for (int i = 0; i < 11; i++) {
            runsConceded[i] = getRunsConcededForPlayer(playerIDs[i]);
        }

        double[] wicketsTaken = new double[11];

        for (int i = 0; i < 11; i++) {
            wicketsTaken[i] = getWicketsTakenForPlayer(playerIDs[i]);
            if (wicketsTaken[i] == 0) {
                wicketsTaken[i] = 1;
            }
        }

        double[] bowlingAvg = new double[11];

        for (int i = 0; i < 11; i++) {
            bowlingAvg[i] = (runsConceded[i] / wicketsTaken[i]);
        }

        String updateQuery = "UPDATE PlayerStats SET bowlingAvg = ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(updateQuery)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setDouble(1, bowlingAvg[i]);
                stmt.setString(2, playerIDs[i]);

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("BowlingAvg updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("BowlingAvg not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void setEconomy() {
        double[] runsConceded = new double[11];

        for (int i = 0; i < 11; i++) {
            runsConceded[i] = getRunsConcededForPlayer(playerIDs[i]);
        }

        int[] oversBowled = new int[11];

        for(int i = 0; i < 11; i++){
            oversBowled[i] = getBallsBowledForPlayer(playerIDs[i]) / 6;
        }

        double[] economy = new double[11];

        for (int i = 0; i < 11; i++) {
            oversBowled[i] = getBallsBowledForPlayer(playerIDs[i]) / 6;

            // Avoid division by zero
            if (oversBowled[i] == 0) {
                economy[i] = 0.0; // Set a default value or handle accordingly
            } else {
                economy[i] = (runsConceded[i] / oversBowled[i]);
            }
        }


        String updateQuery = "UPDATE PlayerStats SET economy = ? WHERE PLAYERID = ?";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(updateQuery)) {

            for (int i = 0; i < 11; i++) {
                // Set the parameters for the prepared statement
                stmt.setDouble(1, economy[i]);
                stmt.setString(2, playerIDs[i]);

                // Execute the update
                int rowsUpdated = stmt.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Economy updated successfully for player: " + playerIDs[i]);
                } else {
                    System.out.println("Economy not updated for player: " + playerIDs[i]);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public void insertIntoDb(int[] runsConceded, int[] ballsBowled, int[] wicketsTaken) {
        incrementNoMatches(playerIDs);

        setRunsConceded(runsConceded);
        setBallsBowled(ballsBowled);
        setWicketsTaken(wicketsTaken);
        setBowlingAvg();
        setEconomy();
    }

    public double[] getEconomy(){
        JTextField[] economyTextFields = {
                txtEconomyPlayer1, txtEconomyPlayer2, txtEconomyPlayer3, txtEconomyPlayer4,
                txtEconomyPlayer5, txtEconomyPlayer6, txtEconomyPlayer7, txtEconomyPlayer8,
                txtEconomyPlayer9, txtEconomyPlayer10, txtEconomyPlayer11
        };

        return getNumericValuesDouble(economyTextFields);
    }

    public double[] getBowlingAvg(){
        JTextField[] bowlingAvgTextFields = {
                txtBowlingAvgPlayer1, txtBowlingAvgPlayer2, txtBowlingAvgPlayer3, txtBowlingAvgPlayer4,
                txtBowlingAvgPlayer5, txtBowlingAvgPlayer6, txtBowlingAvgPlayer7, txtBowlingAvgPlayer8,
                txtBowlingAvgPlayer9, txtBowlingAvgPlayer10, txtBowlingAvgPlayer11
        };

        return getNumericValuesDouble(bowlingAvgTextFields);
    }

    public int[] getRunsConceded() {
        JTextField[] runsTextFields = {
                txtRunsPlayer1, txtRunsPlayer2, txtRunsPlayer3, txtRunsPlayer4,
                txtRunsPlayer5, txtRunsPlayer6, txtRunsPlayer7, txtRunsPlayer8,
                txtRunsPlayer9, txtRunsPlayer10, txtRunsPlayer11
        };

        return getNumericValues(runsTextFields);
    }

    public int[] getBallsBowled(){
        JTextField[] ballsTextFields = {
                txtBallsPlayer1, txtBallsPlayer2, txtBallsPlayer3, txtBallsPlayer4,
                txtBallsPlayer5, txtBallsPlayer6, txtBallsPlayer7, txtBallsPlayer8,
                txtBallsPlayer9, txtBallsPlayer10, txtBallsPlayer11
        };

        return getNumericValues(ballsTextFields);
    }

    public int[] getWicketsTaken(){
        JTextField[] wicketsTextFields = {
                txtWicketsPlayer1, txtWicketsPlayer2, txtWicketsPlayer3, txtWicketsPlayer4,
                txtWicketsPlayer5, txtWicketsPlayer6, txtWicketsPlayer7, txtWicketsPlayer8,
                txtWicketsPlayer9, txtWicketsPlayer10, txtWicketsPlayer11
        };

        return getNumericValues(wicketsTextFields);
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

    public double[] getNumericValuesDouble(JTextField[] textFields) {
        double[] values = new double[11];

        for (int i = 0; i < 11; i++) {
            values[i] = parseNumericValueDouble(textFields[i].getText());
        }

        return values;
    }

    private double parseNumericValueDouble(String input) {
        try {
            return input.isEmpty() ? 0.0 : Double.parseDouble(input);
        } catch (NumberFormatException e) {
            // Handle the case where parsing fails, e.g., if the input is not a valid double
            return 0.0;
        }
    }

    public JPanel getPanelMain(){
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
