# empty
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* function[meta id-type]

```cpp
bool empty() const;               // (1) C++03
[[nodiscard]] bool empty() const; // (1) C++20
constexpr bool empty() const;     // (1) C++26
```

## 概要
`priority_queue`が空か否か、つまり要素数が 0 か否かを判定する。

内部のコンテナの `empty()` メンバ関数を呼ぶ。


## 効果
`return c.empty();`


## 戻り値
要素数が0の場合は`true`、それ以外の場合は`false`を返す。


## 例
```cpp example
#include <iostream>
#include <queue>

int main()
{
  // 空のキュー
  {
    std::priority_queue<int> empty_que;

    if (empty_que.empty()) {
      std::cout << "empty_que is empty" << std::endl;
    }
    else {
      std::cout << "empty_que is not empty" << std::endl;
    }
  }

  // 非空のキュー
  {
    std::priority_queue<int> non_empty_que;
    non_empty_que.push(3);

    if (non_empty_que.empty()) {
      std::cout << "non_empty_que is empty" << std::endl;
    }
    else {
      std::cout << "non_empty_que is not empty" << std::endl;
    }
  }
}
```
* empty()[color ff0000]
* non_empty_que.push[link push.md]

### 出力
```
empty_que is empty
non_empty_que is not empty
```

## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
