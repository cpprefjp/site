# assign
* string[meta header]
* std[meta namespace]
* char_traits[meta class]
* function[meta id-type]

```cpp
static void assign(char_type& c1, const char_type& c2);             // (1) C++03
static void assign(char_type& c1, const char_type& c2) noexcept;    // (1) C++11

static char_type*
  assign(char_type* s, std::size_t n, char_type a);                 // (2) C++03
static constexpr char_type*
  assign(char_type* s, std::size_t n, char_type a);                 // (2) C++20
```

## 概要
左辺に右辺を代入する。


## 効果
- (1) 標準で定義される`char_traits`の特殊化では、`c1 = c2`により代入を行う。
- (2) 長さ`n`の文�列`s`の各要素に`a`を代入する。


## 戻り値
- (1) なし
- (2) 代入完了後の`s`を返す。


## 計算量
- (1) 定数時間
- (2) 線形時間

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  char c = 'a';
  std::char_traits<char>::assign(c, 'b');

  std::cout << c << std::endl;
}
```
* assign[color ff0000]

### 出力
```
b
```

## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
