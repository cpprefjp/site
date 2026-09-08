# rewind
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void rewind(FILE* stream);
}
```
* FILE[link file.md]

## 概要
ファイルストリームの現在位置を先頭に戻し、エラー状態とファイル終端の状態をクリアする。

[`fseek()`](fseek.md)`(stream, 0L,` [`SEEK_SET`](seek_set.md)`)`を実行したうえで、[`clearerr()`](clearerr.md)`(stream)`を実行することと等価である。


## 戻り値
なし。

エラーが発生したかどうかは、この関数からは判別できない。判別が必要な場合は[`fseek()`](fseek.md)を使用する。


## 例
```cpp example
#include <cstdio>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputs("ABCDEF", fp);

  // 現在位置を先頭に戻して読み直す
  std::rewind(fp);
  std::printf("%c\n", std::fgetc(fp));

  std::fclose(fp);
}
```
* std::rewind[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::fgetc[link fgetc.md]
* std::printf[link printf.md]
* std::FILE[link file.md]

### 出力
```
A
```


## 関連項目
- [`fseek`](fseek.md)
- [`clearerr`](clearerr.md)
