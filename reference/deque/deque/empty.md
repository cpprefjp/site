# empty
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
bool empty() const;                        // C++03
bool empty() const noexcept;               // C++11
[[nodiscard]] bool empty() const noexcept; // C++20
bool empty() const noexcept;               // C++26
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  // 空
  {
    std::deque<int> c;
    bool b = c.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::deque<int> c = {1, 2, 3};
    bool b = c.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
true
false
```

## 関連項目

| 名前 | 説明 |
|-----------------------|----------------------|
| [`clear`](clear.md) | 全ての要素を削除する |
| [`erase`](erase.md) | 要素を削除する |
| [`size`](size.md)   | 要素数を取得する |


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
