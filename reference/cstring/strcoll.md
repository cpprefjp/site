# strcoll
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int strcoll(const char* s1, const char* s2);
}
```

## 概要
文字列を、ロケールに依存して比較する。


## 効果
現在のロケールの`LC_COLLATE`カテゴリに従って、`s1`が指す文字列と`s2`が指す文字列を比較する。


## 戻り値
`s1`側の文字列が`s2`側の文字列より大きい場合は正の整数、小さい場合は負の整数を返す。2つの文字列が等しい場合は`0`を返す。


## 備考
- この関数はロケールに依存するため、フリースタンディング処理系では提供されない。
- ロケールに依存しない単純なバイト単位の比較を行う場合は、[`strcmp`](strcmp.md)を使用する。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  int r = std::strcoll("apple", "banana");

  std::cout << (r < 0 ? "less" : r > 0 ? "greater" : "equal") << std::endl;
}
```
* std::strcoll[color ff0000]

### 出力例
```
less
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcmp`](strcmp.md): 文字列を比較する
- [`strxfrm`](strxfrm.md): ロケールに基づいて文字列を変換する


## 参照
- [N3220 7.26.4.3 The `strcoll` function](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf)
