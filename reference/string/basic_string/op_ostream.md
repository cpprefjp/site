# operator<<
* string[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits, class Allocator>
  std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os,
               const basic_string<CharT, Traits, Allocator>& s);
}
```

## 概要

文字列をストリームへ出力する。

## 効果
書式化出力関数として振る舞う。

1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 出力する文字列を決定する。初期状態はイテレータ範囲`[s.`[`begin()`](begin.md)`, s.`[`end()`](end.md)`)`の要素からなる文字列である。
    - `s.`[`size`](size.md)`()`が`os.`[`width`](/reference/ios/ios_base/width.md)`()`より小さい場合、`os.`[`width`](/reference/ios/ios_base/width.md)`()`文字の幅になるまで、必要な数の`os.`[`fill`](/reference/ios/basic_ios/fill.md)`()`をこの文字列へ追加する。
    - `(os.`[`flags`](/reference/ios/ios_base/flags.md)`() & `[`std::ios_base::adjustfield`](/reference/ios/ios_base/type-fmtflags.md)`) == `[`std::ios_base::left`](/reference/ios/ios_base/type-fmtflags.md)である場合、埋め文字は文字列の後ろに置かれる。そうでない場合は前に置かれる。
1. 上記で得られた文字列`seq`を、`os.`[`rdbuf`](/reference/ios/basic_ios/rdbuf.md)`()->`[`sputn`](/reference/streambuf/basic_streambuf/sputn.md)`(seq, n)`を呼び出したかのようにして出力する。ここで`n`は`os.`[`width`](/reference/ios/ios_base/width.md)`()`と`s.`[`size`](size.md)`()`のうち大きい方である。
1. `os.`[`width`](/reference/ios/ios_base/width.md)`(0)`を呼び出す。

## 戻り値
`os`

## 例
```cpp example
#include <iostream>
#include <string>

int main() {
  std::string s = "Tuna";
  std::cout << s << std::endl;
}
```

### 出力例
```
Tuna
```

## 実装例
TBD

## バージョン
### 言語
- C++98

## 参照
- このほかの`<<`演算子関数
    - [`<ostream>`ヘッダで定義されているもの](../../ostream/basic_ostream/op_ostream.md)
- [LWG Issue 2011. Unexpected output required of strings](https://cplusplus.github.io/LWG/issue2011)
    - C++14で、パディングの決定方法がこの関数自身の規定として明記された
    - この修正は欠陥報告(DR)であり、C++98以降に遡及して適用される。元の規定は数値出力のための[`num_put::do_put`](/reference/locale/num_put/do_put.md)の「Fill padding」表を参照していたため、[`std::ios_base::internal`](/reference/ios/ios_base/type-fmtflags.md)指定時に`"0X1Y2Z"`が`"0X**1Y2Z"`と出力されることを要求していたが、処理系は当初から`"**0X1Y2Z"`を出力していたため
