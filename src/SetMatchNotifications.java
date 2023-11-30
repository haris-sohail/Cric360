import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
import java.util.Random;

public class SetMatchNotifications extends JFrame {

    private JPanel panelMain;
    private JButton preferredPlayersButton;
    private JButton favoriteTeamsButton;
    private JButton specificMatchesButton;
    private JButton backButton;

    public SetMatchNotifications() {

        // Add action listener to preferredPlayersButton
        preferredPlayersButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

                showPreferredPlayersPage();
            }
        });


        favoriteTeamsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showFavoriteTeamsPage();
            }
        });
    }

    public JPanel getPanelMain() {
        return panelMain;
    }

    private void showPreferredPlayersPage() {
        // Connect to the database and retrieve player data
        try (Connection connection = DriverManager.getConnection(Main.connectionString);
             PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Player");
             ResultSet resultSet = preparedStatement.executeQuery()) {

            // Process the result set and create player information
            StringBuilder playerInfo = new StringBuilder("Preferred Players:\n");
            playerInfo.append(String.format("%-15s %-15s %-20s %-15s\n", "User ID", "Team ID", "Leaderboard Rank", "Fantasy Team ID"));

            while (resultSet.next()) {
                String playsInTeam = resultSet.getString("playsInTeam");
                String userId = resultSet.getString("user_id");
                int leaderBoardRank = resultSet.getInt("leaderBoardRank");
                int fantasyTeamId = resultSet.getInt("fantasyTeamId");

                playerInfo.append(String.format("%-15s %-15s %-20s %-15s\n", userId, playsInTeam, leaderBoardRank, fantasyTeamId));
            }

            // Display player information in a new frame
            displayPlayerInfoFrame(playerInfo.toString());
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error retrieving player data from the database.");
        }
    }

    private void displayPlayerInfoFrame(String playerInfo) {
        JTextArea textArea = new JTextArea(playerInfo);
        textArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 12));
        textArea.setEditable(false);

        JScrollPane scrollPane = new JScrollPane(textArea);

        JFrame frame = new JFrame("Player Information");
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.getContentPane().add(scrollPane, BorderLayout.CENTER);
        frame.setSize(525, 300);
        frame.setLocationRelativeTo(this);
        frame.setVisible(true);
    }

    private void showFavoriteTeamsPage() {
        JFrame teamsFrame = new JFrame("Select Favorite Team");
        teamsFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        teamsFrame.setSize(300, 200);
        teamsFrame.setLocationRelativeTo(this);

        // Connect to the database and retrieve team names
        try (Connection connection = DriverManager.getConnection(Main.connectionString);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT name FROM Team")) {

            DefaultListModel<String> teamListModel = new DefaultListModel<>();

            // Add team names to the list model
            while (resultSet.next()) {
                teamListModel.addElement(resultSet.getString("name"));
            }

            JList<String> teamJList = new JList<>(teamListModel);
            JScrollPane scrollPane = new JScrollPane(teamJList);

            JButton addToFavoritesButton = new JButton("Add to Favorites");
            addToFavoritesButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    // Get the selected team from the list
                    String selectedTeam = teamJList.getSelectedValue();

                    // Display a message (replace with your logic)
                    addToFavorites(selectedTeam);
                }
            });

            teamsFrame.setLayout(new BorderLayout());
            teamsFrame.add(scrollPane, BorderLayout.CENTER);
            teamsFrame.add(addToFavoritesButton, BorderLayout.SOUTH);

            teamsFrame.setVisible(true);
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error retrieving team names from the database.");
        }
    }

    private void addToFavorites(String selectedTeam) {
        // Connect to the database and add the selected team to the FantasyTeam table
        try (Connection connection = DriverManager.getConnection(Main.connectionString);
             PreparedStatement preparedStatement = connection.prepareStatement(
                     "INSERT INTO FantasyTeam (points, id, name) VALUES (?, ?, ?)")) {

            // Generate a random number between 150 and 700 for points
            Random random = new Random();
            int points = random.nextInt(551) + 150;

            // Get the next available ID for FantasyTeam
            int nextId = getNextFantasyTeamId(connection);

            // Set values in the prepared statement
            preparedStatement.setInt(1, points);
            preparedStatement.setInt(2, nextId);
            preparedStatement.setString(3, selectedTeam);

            // Execute the SQL statement
            int rowsUpdated = preparedStatement.executeUpdate();

            if (rowsUpdated > 0) {
                JOptionPane.showMessageDialog(this, "Team added to favorites successfully.");
            } else {
                JOptionPane.showMessageDialog(this, "Error adding team to favorites.");
            }

        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error adding team to favorites.");
        }
    }

    private int getNextFantasyTeamId(Connection connection) throws SQLException {
        // Get the next available ID for FantasyTeam
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT MAX(id) FROM FantasyTeam")) {

            if (resultSet.next()) {
                return resultSet.getInt(1) + 1;
            } else {
                return 1; // If no rows in the table, start with ID 1
            }
        }
    }

}


