# wcstombs
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcstombs(char* s, const wchar_t* pwcs, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
ワイド文字列を、マルチバイト文字列へ変換する。

`pwcs`が指す文字列を初期変換状態から順に変換し、`s`が指す配列へ最大`n`バイトを書き込む。終端のヌル文字に達した場合は、それも書き込まれる。

この関数は現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存してマルチバイト文字を解釈する。

内部状態に依存するエンコーディングを考慮するならば、特に理由がない限り、この関数ではなく[`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取る[`std::wcsrtombs()`](/reference/cwchar/wcsrtombs.md)を新しいコードでは用いるべきである。


## 戻り値
- 変換できた場合、書き込んだバイト数（終端のヌル文字を含まない）を返す
- 変換できないワイド文字があった場合、`(size_t)-1`を返す

戻り値が`n`と等しい場合、終端のヌル文字は書き込まれていない。


## 備考
- `s`がヌルポインタの場合、書き込みは行われず、変換に必要なバイト数だけが返る。この性質を利用して、必要なバッファサイズを事前に求められる
- 1文字の変換が`n`バイトに収まらない場合、その文字の途中までが書き込まれることはなく、書き込みはその手前で終了する


## 例
```cpp example
#include <clocale>
#include <cstdlib>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const wchar_t* ws = L"abc";

  // 必要なバイト数を先に求める
  std::size_t len = std::wcstombs(nullptr, ws, 0);
  std::cout << len << std::endl;

  char buffer[8] = {};
  std::size_t n = std::wcstombs(buffer, ws, 8);
  std::cout << n << ' ' << buffer << std::endl;
}
```
* std::wcstombs[color ff0000]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
3 abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`mbstowcs`](mbstowcs.md): 逆方向の変換
- [`wctomb`](wctomb.md): 1文字ずつ変換する
- [`std::wcsrtombs()`](/reference/cwchar/wcsrtombs.md): [`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取るスレッドセーフなバージョン
