# fclose
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
int fclose(FILE* stream);
```

## 概要
ファイルを閉じる。

原則、開かれたファイルはプロセスが終了する前にこれを呼び出すことが望ましい。

`fclose`によって閉じられたファイルストリームは無効になり、そのファイルストリームに対する以降の操作は未定義の動作となる。

## 戻り値
正常に実行されれば、`0`を返す。

バッファーのフラッシュ時にエラーが発生した場合、もしくはデータの出力時に障害が発生すると`EOF`を返す。

それ以外のエラーは処理系依存である。

## 例
```cpp example
#include <cstdio>

int main() {
  FILE *fp = fopen("test.txt", "w");
  fclose(fp);
}
```
* fclose[color ff0000]
* fopen[link /reference/cstdio/fopen.md]
* FILE[link /reference/cstdio/file.md]

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
