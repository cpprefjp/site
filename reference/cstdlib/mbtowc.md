# mbtowc
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int mbtowc(wchar_t* pwc, const char* s, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
マルチバイト文字を、ワイド文字へ変換する。

`s`が指す位置から最大`n`バイトを読み込んで1文字分のマルチバイト文字を解析し、対応するワイド文字を`pwc`が指す位置へ格納する。`pwc`がヌルポインタの場合、変換は行われるが結果は格納されない。

この関数は現在のロケールカテゴリ[`LC_CTYPE`](/reference/clocale/lc_ctype.md)に依存してマルチバイト文字を解釈する。

内部状態に依存するエンコーディングを考慮するならば、特に理由がない限り、この関数ではなく[`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取る[`std::mbrtowc()`](/reference/cwchar/mbrtowc.md)を新しいコードでは用いるべきである。


## 戻り値
- `s`がヌルポインタの場合、内部状態を初期化する。現在のエンコーディングが状態を持つ場合は非ゼロの値を返し、それ以外の場合は`0`を返す
- `s`が指す位置がヌル文字である場合、`0`を返す
- 正常に変換できた場合、変換に使用したバイト数（`n`以下の正の値）を返す
- 不正なバイト列である場合、または`n`バイト以内に文字が完結しない場合、`-1`を返す


## 備考
- この関数は静的記憶域の内部状態を保持するため、スレッドセーフではない
    - C++17以降（C11以降）では、`s`がヌルポインタでない呼び出しは、初期変換状態から解析を開始したかのように振る舞うと規定されており、内部状態に依存するエンコーディングを扱えない
- 変換結果を格納する`pwc`は、1文字分のワイド文字を格納できなければならない


## 例
```cpp example
#include <clocale>
#include <cstdlib>
#include <cstring>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  const char* s = "あ";
  wchar_t wc = 0;

  // UTF-8では3バイトを消費して1文字へ変換される
  int n = std::mbtowc(&wc, s, std::strlen(s));

  std::cout << n << std::endl;
  std::cout << (wc == L'あ') << std::endl;
}
```
* std::mbtowc[color ff0000]
* LC_ALL[link /reference/clocale/lc_all.md]
* std::setlocale[link /reference/clocale/setlocale.md]

### 出力例
```
3
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`mblen`](mblen.md): バイト数だけを取得する
- [`wctomb`](wctomb.md): 逆方向の変換
- [`mbstowcs`](mbstowcs.md): 文字列全体を変換する
- [`std::mbrtowc()`](/reference/cwchar/mbrtowc.md): [`std::mbstate_t`](/reference/cwchar/mbstate_t.md)を受け取るスレッドセーフなバージョン
