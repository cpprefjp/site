# empty
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]

```cpp
bool empty() const;               // C++03
[[nodiscard]] bool empty() const; // C++20
bool empty() const;               // C++26
```

## 概要
`queue` が空か否か、つまり要素数が 0 か否かを判定する。
内部のコンテナの `empty()` メンバ関数を呼ぶ。


## 効果
```cpp
return c.empty()
```


## 戻り値
要素数が 0 の場合は `true`、それ以外の場合は `false` を返す。


## 計算量
定数時間 O(1)。


## 例
```cpp example
#include <iostream>
#include <queue>

int main() {
  std::queue<int> que;

  if (que.empty()) {
    std::cout << "empty" << std::endl;
  }
  else {
    std::cout << "not empty" << std::endl;
  }
  return 0;
}
```

### 出力
```
empty
```

## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
