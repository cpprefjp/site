# strxfrm
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t strxfrm(char* s1, const char* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列を、ロケールに基づいて変換する。

変換後の文字列同士を[`strcmp`](strcmp.md)で比較すると、変換前の文字列同士を[`strcoll`](strcoll.md)で比較したのと同じ符号の結果が得られる。


## 効果
現在のロケールの`LC_COLLATE`カテゴリに従って`s2`が指す文字列を変換し、その結果を`s1`が指す配列へ、終端のヌル文字を含めて最大`n`文字コピーする。

戻り値が`n`以上である場合、`s1`が指す配列の内容は不定である。

`n`が`0`の場合、`s1`にヌルポインタを渡してもよい。この用途は、変換に必要な配列サイズを取得するために使用できる。


## 戻り値
変換後の文字列の長さ (終端のヌル文字を含まない) を返す。


## 備考
- この関数はロケールに依存するため、フリースタンディング処理系では提供されない。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  char buf[16];

  // 現在のロケールに基づいて"hello"を変換する
  std::size_t len = std::strxfrm(buf, "hello", sizeof(buf));

  std::cout << len << std::endl;
}
```
* std::strxfrm[color ff0000]

### 出力例
```
5
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcoll`](strcoll.md): 文字列を比較する（ロケール依存）
- [`strcmp`](strcmp.md): 文字列を比較する


## 参照
- [N3220 7.26.4.5 The `strxfrm` function](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf)
