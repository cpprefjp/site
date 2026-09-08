# mbrtowc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t mbrtowc(wchar_t* pwc, const char* s, size_t n, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link mbstate_t.md]

## 概要
マルチバイト文字を、変換状態を保持しながらワイド文字へ変換する。


## 効果
`s`が指す位置から最大`n`バイトを読み込み、1文字分のマルチバイト文字をワイド文字へ変換して、`pwc`が非`nullptr`であればそこへ格納する。


## 戻り値
| 戻り値 | 意味 |
|--------|------|
| `0` | ヌル文字へ変換された |
| 正の値（`n`以下） | 変換に使用したバイト数 |
| `(size_t)-1` | 不正なバイト列である。[`errno`](/reference/cerrno/errno.md)に`EILSEQ`が設定される |
| `(size_t)-2` | 次の`n`バイトは不完全だが、不正ではない文字の一部である |


## 備考
- `s`がヌルポインタの場合、`pwc`と`n`は無視され、変換状態を初期状態に戻す動作となる
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される


## 例
```cpp example
#include <cwchar>
#include <clocale>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  std::mbstate_t state{};
  const char* s = "あ";
  wchar_t wc = 0;

  // UTF-8では3バイトを消費して1文字へ変換される
  std::size_t n = std::mbrtowc(&wc, s, 4, &state);
  std::wcout << n << std::endl;
  std::wcout << (wc == L'あ') << std::endl;
}
```
* std::mbrtowc[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]
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
- [`wcrtomb`](wcrtomb.md): 逆方向の変換
- [`mbsrtowcs`](mbsrtowcs.md): 文字列全体を変換する
- [`mbstate_t`](mbstate_t.md)
