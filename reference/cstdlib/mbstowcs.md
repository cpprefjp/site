# mbstowcs
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t mbstowcs(wchar_t* pwcs, const char* s, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
マルチバイト文字列を、ワイド文字列へ変換する。

`s`が指す文字列を初期変換状態から順に変換し、`pwcs`が指す配列へ最大`n`文字を書き込む。終端のヌル文字に達した場合は、それも書き込まれる。

この関数は現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存してマルチバイト文字を解釈する。

内部状態に依存するエンコーディングを考慮するならば、特に理由がない限り、この関数ではなく[`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取る[`std::mbsrtowcs()`](/reference/cwchar/mbsrtowcs.md)を新しいコードでは用いるべきである。


## 戻り値
- 変換できた場合、書き込んだ文字数（終端のヌル文字を含まない）を返す
- 不正なバイト列があった場合、`(size_t)-1`を返す

戻り値が`n`と等しい場合、終端のヌル文字は書き込まれていない。


## 備考
- `pwcs`がヌルポインタの場合、書き込みは行われず、変換に必要な文字数だけが返る。この性質を利用して、必要なバッファサイズを事前に求められる
- 変換先と変換元の領域が重なっている場合、動作は未定義である


## 例
```cpp example
#include <clocale>
#include <cstdlib>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const char* s = "abc";

  // 必要な文字数を先に求める
  std::size_t len = std::mbstowcs(nullptr, s, 0);
  std::cout << len << std::endl;

  wchar_t buffer[8] = {};
  std::size_t n = std::mbstowcs(buffer, s, 8);
  std::cout << n << std::endl;
}
```
* std::mbstowcs[color ff0000]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
3
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcstombs`](wcstombs.md): 逆方向の変換
- [`mbtowc`](mbtowc.md): 1文字ずつ変換する
- [`std::mbsrtowcs()`](/reference/cwchar/mbsrtowcs.md): [`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取るスレッドセーフなバージョン
