# perror
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void perror(const char* s);
}
```

## 概要
直近のエラーに対応するエラーメッセージを、標準エラー出力に出力する。


## 効果
[`errno`](/reference/cerrno/errno.md)の現在の値に対応するエラーメッセージを、標準エラー出力ストリーム[`stderr`](stderr.md)へ出力する。出力されるメッセージは[`std::strerror`](/reference/cstring/strerror.md)`(`[`errno`](/reference/cerrno/errno.md)`)`が返す文字列と同等である。

- `s`がヌルポインタではなく、かつ`s[0]`がヌル文字ではない場合、`s`が指す文字列、`": "`、エラーメッセージ、改行の順に出力する。
- そうでない場合、エラーメッセージと改行のみを出力する。


## 戻り値
なし


## 例
```cpp example
#include <cstdio>

int main()
{
  // 存在しないファイルを開こうとして失敗させる
  std::FILE* fp = std::fopen("nonexistent-file", "r");
  if (fp == nullptr) {
    std::perror("fopen failed");
  }
}
```
* std::perror[color ff0000]
* std::fopen[link fopen.md]

### 出力例
```
fopen failed: No such file or directory
```


## バージョン
### 言語
- C++98


## 関連項目
- [`std::strerror`](/reference/cstring/strerror.md): エラー番号に対応するエラーメッセージ文字列を取得する
- [`errno`](/reference/cerrno/errno.md): 直近のエラー番号を保持するマクロ


## 参照
- [N3220 7.23.10.4 The `perror` function](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf)
