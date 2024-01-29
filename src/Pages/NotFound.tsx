import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100vh;
  transform: translate(50%, 50%);
`;

export function NotFound() {
  return (
    <Container>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button>
        <a href="/meals">Go to Home</a>
      </button>
    </Container>
  );
}
