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

    private JButton preferredPlayersButton;
    private JButton backButton;
    private JButton favoriteTeamsButton;
    private JButton specificMatchesButton;

    public SetMatchNotifications() {
        // Initialize buttons
        preferredPlayersButton = new JButton("Preferred Players");
        backButton = new JButton("Back");
        favoriteTeamsButton = new JButton("Favorite Teams");
        specificMatchesButton = new JButton("Specific Matches");

        // Add action listener to preferredPlayersButton
        preferredPlayersButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showPreferredPlayersPage();
            }
        });

        // Set layout
        setLayout(new FlowLayout());

        // Add buttons to the JFrame
        add(preferredPlayersButton);
        add(favoriteTeamsButton);
        add(specificMatchesButton);
        add(backButton);

        // Set frame properties
        setTitle("Set Match Notifications");
        setSize(200, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    private void showPreferredPlayersPage() {
        // Connect to the database and retrieve player data
        try (Connection connection = DriverManager.getConnection("jdbc:sqlserver://DESKTOP-2BV11P4\\SQLEXPRESS:50143;Database=Cric360;IntegratedSecurity=true;encrypt=false");
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

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new SetMatchNotifications().setVisible(true));
    }
}
