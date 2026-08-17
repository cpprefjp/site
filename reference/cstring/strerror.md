# strerror
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* strerror(int errnum);
}
```

## 概要
エラー番号に対応するエラーメッセージ文字列を取得する。


## 効果
`errnum`で表されるエラー番号に対応する、処理系定義のエラーメッセージ文字列を求める。エラー番号としては、[`errno`](/reference/cerrno/errno.md)に設定されうる値を渡すことが想定される。


## 戻り値
エラーメッセージ文字列を指すポインタを返す。


## 備考
- この関数はロケールに依存しうるため、フリースタンディング処理系では提供されない。
- 返された文字列を、このプログラムから書き換えてはならない。返された文字列は、以降の`strerror`呼び出しによって上書きされることがある。
- この関数は内部の静的な記憶域を使用しうるため、スレッドセーフではない。


## 例
```cpp example
#include <cstring>
#include <cerrno>
#include <iostream>

int main()
{
  // 定義域エラーに対応するメッセージを取得する
  std::cout << std::strerror(EDOM) << std::endl;
}
```
* std::strerror[color ff0000]

### 出力例
```
Numerical argument out of domain
```


## バージョン
### 言語
- C++98


## 関連項目
- [`errno`](/reference/cerrno/errno.md): 直近のエラー番号を保持するマクロ
- [`perror`](/reference/cstdio/perror.md): エラーメッセージを標準エラー出力へ出力する


## 参照
- [N3220 7.26.6.3 The `strerror` function](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf)
