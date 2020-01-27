# compare
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr int compare(basic_string_view sv) const noexcept; // (1)

constexpr int compare(size_type pos1,
                      size_type n1,
                      basic_string_view sv) const;          // (2)

constexpr int compare(size_type pos1,
                      size_type n1,
                      basic_string_view sv,
                      size_type pos2,
                      size_type n2) const;                  // (3)

constexpr int compare(const CharT* s) const;                // (4)

constexpr int compare(size_type pos1,
                      size_type n1,
                      const CharT* s) const;                // (5)

constexpr int compare(size_type pos1,
                      size_type n1,
                      const CharT* s,
                      size_type n2) const;                  // (6)
```

## 概要
他の文�列との比較を行う。

- (1) : `*this`と`s`を比較する
- (2) : `*this`の範囲`[pos1, pos1 + n1)`と`s`を比較する
- (3) : `*this`の範囲`[pos1, pos1 + n1)`と`s`の範囲`[pos2, pos2 + n2)`を比較する
- (4) : `*this`と文�配列`s`を比較する
- (5) : `*this`の範囲`[pos1, pos1 + n1)`と文�配列`s`を比較する
- (6) : `*this`の範囲`[pos1, pos1 + n1)`と文�配列`s`の先�`n2`文�を比較する


## 効果
- (1) :
    - [`size()`](size.md)と`str.`[`size()`](size.md)のうち、小さい方を`rlen`とする
    - `int result = Traits::`[`compare`](/reference/string/char_traits/compare.md)`(`[`data()`](data.md)`, sv.`[`data()`](data.md)`, rlen);`
    - `result != 0`であれば`result`を返す。そうでなければ、以下のように返す：
        - `size() < str.size()`であれば0未満の値を返す
        - `size() == str.size()`であれば0を返す
        - `size() > str.size()`であれば0超の値を返す
- (2) : `return` [`substr`](substr.md)`(pos1, n1).compare(sv);` と�価
- (3) : `return` [`substr`](substr.md)`(pos1, n1).compare(sv.`[`substr`](substr.md)`(pos2, n2));` と�価
- (4) : `return compare(basic_string_view(s));` と�価
- (5) : `return` [`substr`](substr.md)`(pos1, n1).compare(basic_string_view(s));` と�価
- (6) : `return` [`substr`](substr.md)`(pos1, n1).compare(basic_string_view(s, n2));` と�価


## 戻り値
`*this`と比較対象が同値であれば値`0`を返す。そうでなければ非`0`を返す。`*this`よりも比較対象がサイズもしくは辞書順として小さい場合は`0`未満の値、`*this`よりも比較対象がサイズもしくは辞書順として大きい場合は`0`より大きい値を返す。


## 例外
- (1) : 投げない


## 計算量
- (1) : `rlen`に対して線形時間


## 例
```cpp example
#include <cassert>
#include <string_view>

int main()
{
  std::string_view a = "aaa";
  std::string_view b = "bbb";
  std::string_view c = "XXaaaYY";

  // (1)
  {
    assert(a.compare(a) == 0);
    assert(a.compare(b) < 0);
    assert(b.compare(a) > 0);
  }

  // (2)
  {
    assert(c.compare(2, 3, a) == 0);
  }

  // (3)
  {
    assert(c.compare(2, 3, a, 0, 3) == 0);
  }

  // (4)
  {
    assert(a.compare("aaa") == 0);
  }

  // (5)
  {
    assert(c.compare(2, 3, "aaa") == 0);
  }

  // (6)
  {
    assert(c.compare(2, 3, "aaaZZ", 3) == 0);
  }
}
```
* compare[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
