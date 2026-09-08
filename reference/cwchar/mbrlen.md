# mbrlen
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t mbrlen(const char* s, size_t n, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]
* mbstate_t[link mbstate_t.md]

## 概要
マルチバイト文字を構成するバイト数を、変換状態を保持しながら取得する。

`s`が指す位置から最大`n`バイトを調べ、1文字を構成するバイト数を返す。[`<cstdlib>`](/reference/cstdlib.md)の[`mblen()`](/reference/cstdlib/mblen.md)と違って変換状態を引数として受け取るため、複数のスレッドから安全に使用できる。


## 戻り値
| 戻り値 | 意味 |
|--------|------|
| `0` | 次の`n`バイト以内にヌル文字が現れた |
| 正の値（`n`以下） | 完全な1文字を構成するバイト数 |
| `(size_t)-1` | 不正なバイト列である。[`errno`](/reference/cerrno/errno.md)に`EILSEQ`が設定される |
| `(size_t)-2` | 次の`n`バイトは不完全だが、不正ではない文字の一部である |


## 備考
- `ps`がヌルポインタの場合、処理系が用意した内部のオブジェクトが変換状態として使用される
- 戻り値が`(size_t)-2`となった場合、続きのバイト列を同じ変換状態とともに渡すことで、変換を再開できる


## 例
```cpp example
#include <iostream>
#include <clocale>
#include <cwchar>

int main()
{
  std::setlocale(LC_ALL, "C.UTF-8");

  std::mbstate_t state{};
  const char* s = "aあ";

  // 'a'は1バイト
  std::size_t n1 = std::mbrlen(s, 4, &state);
  std::cout << n1 << std::endl;

  // 'あ'はUTF-8では3バイト
  std::size_t n2 = std::mbrlen(s + n1, 4, &state);
  std::cout << n2 << std::endl;
}
```
* std::mbrlen[color ff0000]
* std::mbstate_t[link mbstate_t.md]
* std::setlocale[link /reference/clocale/setlocale.md]
* std::size_t[link /reference/cstddef/size_t.md]

### 出力例
```
1
3
```

ロケールの設定に対応していない環境では、異なる結果となる場合がある。


## 関連項目
- [`mbstate_t`](mbstate_t.md)
- [`mbsinit`](mbsinit.md)
- [`mblen`](/reference/cstdlib/mblen.md)
