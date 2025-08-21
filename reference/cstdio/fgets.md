# fgets
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* fgets( char* str, int count, FILE* stream );
}
```

## 概要
指定されたファイルストリームから、指定されたバッファに指定された最大文字数までの文字を読み込む。

読まれる文字はcount-1文字まで、終端にはヌル文字が追加される。

また、改行にたどり着くとそこで読み込みを終了する(末尾に改行文字を含める)。

## 要件
- `str`は有効なポインタであること。
- `stream`は有効なファイルストリームであること。
- `str`が指すメモリ領域と`stream`が指すファイルストリームの内部バッファが重複していないこと。

## 戻り値
成功すれば読み込まれた文字列を、そうでなければ`NULL`を返す。

## 例
```cpp example
#include <cstdio>

int main() {
  char str[10];
  std::fgets(str, sizeof(str), stdin);
  std::puts(str);
}
```
* std::fgets[color ff0000]
* std::puts[link /reference/cstdio/puts.md]

### 入力
```
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

### 出力
```
aaaaaaaaa
```

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
