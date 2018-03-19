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
- (2) : コピーコンストラクタ。コピー元と同じ文字列を参照する
- (3) : 文字配列を受けとって、その文字配列の全体を参照する
- (4) : 文字配列と長さを受けとって、文字配列`str`の先頭`len`文字を参照する


## 要件
- (3) : 範囲`[str, str + Traits::length(str))`が妥当であること (アクセス可能であること)
- (4) : 範囲`[str, str + len)`が妥当であること


## 効果
メンバ変数として、参照する文字配列へのポインタを`CharT* data_`、文字数を`size_type size_`があるものとして、

- (1) : `data_ = nullptr;`および`size_ = 0;`とする
- (3) : `data_ = str;`および`size_ = Traits::`[`length`](/reference/string/char_traits/length.md)`(str);`とする
- (4) : `data_ = str;`および`size_ = len;`とする


## 計算量
- (1), (4) : 定数時間
- (3): 文字数に対して線形時間


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
  // コピーコンストラクタ。コピー元と同じ文字列を参照する
  {
    std::string_view base{"Hello World"};
    std::string_view sv = base;

    std::cout << "(2) : " << sv << std::endl;
  }

  // (3)
  // 文字配列を受けとって参照するコンストラクタ
  {
    std::string_view sv = "Hello World";
    std::cout << "(3) : " << sv << std::endl;
  }

  // (4)
  // 文字配列と文字数を受けとって部分文字列を参照するコンストラクタ
  {
    // "Hello World"の先頭5文字"Hello"を参照
    std::string_view sv{"Hello World", 5};
    std::cout << "(4) : " << sv << std::endl;
  }
}
```
* sv.data()[link data.md.nolink]
* sv.size()[link size.md.nolink]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0
- [GCC, C++17 mode](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
