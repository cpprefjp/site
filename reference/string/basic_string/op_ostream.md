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

文�列をストリームへ出力する。

## 効果
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. 仮引数`s`が指し示す文�列を出力する。
    - `width()`と`flags() & (ios_base::adjustfield)`に従ってパディングの出力も行う。
1. `width(0)`を呼び出す。

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
- このほかの`<<`演算�関数
    - [`<ostream>`ヘッダで定義されているもの](../../ostream/basic_ostream/op_ostream.md)
