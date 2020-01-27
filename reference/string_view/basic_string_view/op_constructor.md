# コンストラクタ
* string_view[meta header]
* std[meta namespace]
* basic_string_view[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr basic_string_view() noexcept;                       // (1)
constexpr basic_string_view(
            const basic_string_view&) noexcept = default;     // (2)
constexpr basic_string_view(const CharT* str);                // (3)
constexpr basic_string_view(const CharT* str, size_type len); // (4)
```

## 概要
- (1) : デフォルトコンストラクタ。空の`basic_string_view`オブジェクトを構築する
- (2) : コピーコンストラクタ。コピー元と同じ文�列を参照する
- (3) : 文�配列を受けとって、その文�配列の全体(ただしヌル文�列を含む場合はそこまで)を参照する
- (4) : 文�配列と長さを受けとって、文�配列`str`の先�`len`文�を参照する


## 要件
- (3) : 範囲`[str, str + Traits::`[`length`](/reference/string/char_traits/length.md)`(str))`が妥当であること (アクセス可能であること)
- (4) : 範囲`[str, str + len)`が妥当であること


## 効果
メンバ変数として、参照する文�配列へのポインタを`const CharT* data_`、文�数を`size_type size_`があるものとして、

- (1) : `data_ = nullptr;`および`size_ = 0;`とする
- (3) : `data_ = str;`および`size_ = Traits::`[`length`](/reference/string/char_traits/length.md)`(str);`とする
- (4) : `data_ = str;`および`size_ = len;`とする


## 計算量
- (1), (4) : 定数時間
- (3): 文�数に対して線形時間

## 備考
- `basic_string_view`のコンストラクタに`template<size_t N>basic_string_view(const charT (&str)[N])`タイプの配列を受け取るコンストラクタが無いのは次の使い方をしたとき`str`のサイズが`sizeof(buf)`となり、それは利用者の意図しない挙動になる可能性が高いと判�されたからである。

```cpp example
char buf[128];
snprintf(buf, sizeof(buf), "abc");
string_view str(buf);
```

- ヌル文�を含む文�列リテラル全体から`basic_string_view`を構築したい場合は[`std::string_view_literals::svリテラル`](op_sv.html)を用いる。


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <string_view>

int main()
{
  // (1)
  // デフォルト構築
  {
    std::string_view sv;
    assert(sv.data() == nullptr);
    assert(sv.size() == 0);
  }

  // (2)
  // コピーコンストラクタ。コピー元と同じ文�列を参照する
  {
    std::string_view base{"Hello World"};
    std::string_view sv = base;

    std::cout << "(2) : " << sv << std::endl;
  }

  // (3)
  // 文�配列を受けとって参照するコンストラクタ
  {
    std::string_view sv = "Hello World";
    std::cout << "(3) : " << sv << std::endl;
  }

  // (4)
  // 文�配列と文�数を受けとって部分文�列を参照するコンストラクタ
  {
    // "Hello World"の先�5文�"Hello"を参照
    std::string_view sv{"Hello World", 5};
    std::cout << "(4) : " << sv << std::endl;
  }
}
```
* sv.data()[link data.md]
* sv.size()[link size.md]

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

## 参照
- [ISO/IEC JTC1 SC22 WG21 N3762](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3762.html#avoid-strlen)
