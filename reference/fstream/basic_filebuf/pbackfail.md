# pbackfail
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int_type pbackfail(int_type c = traits::eof());  // (1) C++03
  int_type pbackfail(int_type c = traits::eof()) override; // (1) C++17
```

## 概要
1文字を入力列に戻す。

このメンバ関数は`protected`であり、[`sputbackc()`](/reference/streambuf/basic_streambuf/sputbackc.md)や[`sungetc()`](/reference/streambuf/basic_streambuf/sungetc.md)を通して間接的に呼び出される。


## 効果
可能であれば、`c`が指定する文字を入力シーケンスへ戻す。以下の3つのいずれかの方法で行われる。

- [`Traits::eq_int_type`](/reference/string/char_traits/eq_int_type.md)`(c, `[`Traits::eof()`](/reference/string/char_traits/eof.md)`)`が`false`を返し、この関数が戻し位置（putback position）を利用可能にでき、かつ[`Traits::eq`](/reference/string/char_traits/eq.md)`(`[`Traits::to_char_type`](/reference/string/char_traits/to_char_type.md)`(c), `[`gptr()`](/reference/streambuf/basic_streambuf/gptr.md)`[-1])`が`true`を返す場合、入力シーケンスの次ポインタ[`gptr()`](/reference/streambuf/basic_streambuf/gptr.md)をデクリメントする
- [`Traits::eq_int_type`](/reference/string/char_traits/eq_int_type.md)`(c, `[`Traits::eof()`](/reference/string/char_traits/eof.md)`)`が`false`を返し、この関数が戻し位置を利用可能にでき、かつ戻し位置への代入が許される場合、入力シーケンスの次ポインタをデクリメントし、その位置に`c`を格納する
- [`Traits::eq_int_type`](/reference/string/char_traits/eq_int_type.md)`(c, `[`Traits::eof()`](/reference/string/char_traits/eof.md)`)`が`true`を返し、かつ入力シーケンスに戻し位置があるか、この関数が戻し位置を利用可能にできる場合、入力シーケンスの次ポインタ[`gptr()`](/reference/streambuf/basic_streambuf/gptr.md)をデクリメントする

複数の方法で成功しうる場合、どの方法が選択されるかは未規定である。


## 戻り値
- 上記1番目・2番目の方法で成功した場合、`c`
- 上記3番目の方法で成功した場合、[`Traits::not_eof`](/reference/string/char_traits/not_eof.md)`(c)`
- 失敗した場合、[`Traits::eof()`](/reference/string/char_traits/eof.md)


## 備考
[`is_open()`](is_open.md)`== false`である場合、この関数は常に失敗する。

この関数は、文字を入力シーケンスへ直接戻すわけではない。また、この関数の呼び出しによって利用可能な戻し位置の数が変化することがある。


## 例
```cpp example
#include <iostream>
#include <fstream>

// basic_filebufを継承して、protectedなpbackfailの呼び出しを観測する
struct my_filebuf : std::filebuf {
protected:
  int_type pbackfail(int_type c) override
  {
    std::cout << "pbackfail" << std::endl;
    return std::filebuf::pbackfail(c);
  }
};

int main()
{
  {
    std::filebuf out;
    out.open("test.txt", std::ios_base::out);
    out.sputn("AB", 2);
  }

  my_filebuf buf;
  buf.open("test.txt", std::ios_base::in);

  // 1文字も読み取っていない状態で戻そうとするため、pbackfail()が呼ばれて失敗する
  std::cout << (buf.sungetc() == std::filebuf::traits_type::eof()) << std::endl;
}
```
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* pbackfail[color ff0000]
* out.open[link open.md]
* buf.open[link open.md]
* out.sputn[link /reference/streambuf/basic_streambuf/sputn.md]
* buf.sungetc()[link /reference/streambuf/basic_streambuf/sungetc.md]
* traits_type::eof()[link /reference/string/char_traits/eof.md]

### 出力
```
pbackfail
1
```

## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::pbackfail`](/reference/streambuf/basic_streambuf/pbackfail.md)
- [`basic_streambuf::sputbackc`](/reference/streambuf/basic_streambuf/sputbackc.md)
- [`basic_streambuf::sungetc`](/reference/streambuf/basic_streambuf/sungetc.md)
