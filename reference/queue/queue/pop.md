# pop
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]

```cpp
void pop();           // (1) C++03
constexpr void pop(); // (1) C++26
```

## 概要
`queue` の次の要素を削除して、要素数を１つ減らす。

削除する要素は `queue` の最初にある要素で、[`front()`](front.md) メンバ関数で得られるものであり、そのデストラクタが呼ばれる。

内部のコンテナの `pop_front()` メンバ関数を呼ぶ。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <queue>

int main() {
  std::queue<int> que;

  que.push(10);
  que.push(20);
  que.push(30);

  que.pop(); // 10が削除される
  que.pop(); // 20が削除される
  std::cout << que.front() << std::endl;

  return 0;
}
```
* pop()[color ff0000]
* que.push[link push.md]
* que.front()[link front.md]

### 出力
```
30
```

## 実装例
```cpp
void pop() { c.pop_front(); }
```

## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
