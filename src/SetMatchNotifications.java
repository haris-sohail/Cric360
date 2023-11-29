import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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

    private void showFavoriteTeamsPage() {
        // Replace this with your actual logic to fetch and display favorite teams
        String[] teamList = {"Team A", "Team B", "Team C", "Team D"};

        // Create a list to display favorite teams
        JList<String> teamJList = new JList<>(teamList);

        // Create a scroll pane to handle the list if there are many teams
        JScrollPane scrollPane = new JScrollPane(teamJList);

        // Create a button to add the selected team to favorites
        JButton addToFavoritesButton = new JButton("Add to Favorites");
        addToFavoritesButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Get the selected team from the list
                String selectedTeam = teamJList.getSelectedValue();

                // Display a message (replace with your logic)
                JOptionPane.showMessageDialog(SetMatchNotifications.this, "Added to Favorites: " + selectedTeam);
            }
        });

        // Create a panel to hold the components
        JPanel favoriteTeamsPanel = new JPanel(new BorderLayout());
        favoriteTeamsPanel.add(scrollPane, BorderLayout.CENTER);
        favoriteTeamsPanel.add(addToFavoritesButton, BorderLayout.SOUTH);

        // Create a frame to display the favorite teams page
        JFrame favoriteTeamsFrame = new JFrame("Favorite Teams");
        favoriteTeamsFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        favoriteTeamsFrame.getContentPane().add(favoriteTeamsPanel);
        favoriteTeamsFrame.setSize(300, 200);
        favoriteTeamsFrame.setLocationRelativeTo(this);
        favoriteTeamsFrame.setVisible(true);
    }
    public JPanel getPanelMain() {return panelMain;}
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

//    public static void main(String[] args) {
//        SwingUtilities.invokeLater(() -> new SetMatchNotifications().setVisible(true));
//    }
}
