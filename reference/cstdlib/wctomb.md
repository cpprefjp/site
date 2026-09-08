# wctomb
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wctomb(char* s, wchar_t wc);
}
```

## 概要
ワイド文字を、マルチバイト文字へ変換する。

`wc`をマルチバイト文字へ変換し、`s`が指す配列へ書き込む。書き込まれるバイト数は最大で[`MB_CUR_MAX`](mb_cur_max.md)である。

この関数は現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存してマルチバイト文字を解釈する。

内部状態に依存するエンコーディングを考慮するならば、特に理由がない限り、この関数ではなく[`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取る[`std::wcrtomb()`](/reference/cwchar/wcrtomb.md)を新しいコードでは用いるべきである。


## 戻り値
- `s`がヌルポインタの場合、内部状態を初期化する。現在のエンコーディングが状態を持つ場合は非ゼロの値を返し、それ以外の場合は`0`を返す
- 正常に変換できた場合、書き込んだバイト数を返す
- `wc`が現在のロケールで表現できない場合、`-1`を返す


## 備考
- この関数は静的記憶域の内部状態を保持するため、スレッドセーフではない
- 書き込み先の配列は、[`MB_CUR_MAX`](mb_cur_max.md)バイト以上の大きさをもたなければならない


## 例
```cpp example
#include <clocale>
#include <cstdlib>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  char buffer[MB_CUR_MAX];

  // UTF-8では3バイトへ変換される
  int n = std::wctomb(buffer, L'あ');

  std::cout << n << std::endl;
}
```
* std::wctomb[color ff0000]
* MB_CUR_MAX[link mb_cur_max.md]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
```


## バージョン
### 言語
- C++98


## 関連項目
- [`mbtowc`](mbtowc.md): 逆方向の変換
- [`wcstombs`](wcstombs.md): 文字列全体を変換する
- [`MB_CUR_MAX`](mb_cur_max.md)
- [`std::wcrtomb()`](/reference/cwchar/wcrtomb.md): [`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取るスレッドセーフなバージョン
