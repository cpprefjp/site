# empty
* array[meta header]
* std[meta namespace]
* array[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr bool empty() noexcept;                     // C++11
constexpr bool empty() const noexcept;               // C++14
[[nodiscard]] constexpr bool empty() const noexcept; // C++20
constexpr bool empty() const noexcept;               // C++26
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。

`std::array`コンテナに対して動的な要素の追加・削除はできないため、0要素を持つ`std::array`型オブジェクトを定義した場合にのみ、この関数は`true`を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> non_empty_array;
  std::array<int, 0> empty_array;

  std::cout << std::boolalpha;
  std::cout << "non_empty_array : " << non_empty_array.empty() << std::endl;
  std::cout << "empty_array : " << empty_array.empty() << std::endl;
}
```
* empty[color ff0000]


### 出力
```
non_empty_array : false
empty_array : true
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1) [mark verified], 2010 [mark verified], 2012 [mark verified]


## 参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
