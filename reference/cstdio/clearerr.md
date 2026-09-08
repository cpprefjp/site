# clearerr
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void clearerr(FILE* stream);
}
```
* FILE[link file.md]

## 概要
ファイルストリームのエラー状態とファイル終端の状態をクリアする。

これによって、[`ferror()`](ferror.md)と[`feof()`](feof.md)は`0`を返すようになる。


## 戻り値
なし。


## 例
```cpp example
#include <cstdio>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputs("A", fp);
  std::rewind(fp);

  // 終端まで読み込む
  while (std::fgetc(fp) != EOF) {}
  std::printf("%d\n", std::feof(fp) != 0);

  // 終端の状態をクリアする
  std::clearerr(fp);
  std::printf("%d\n", std::feof(fp) != 0);

  std::fclose(fp);
}
```
* std::clearerr[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::fgetc[link fgetc.md]
* std::feof[link feof.md]
* std::rewind[link rewind.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* EOF[link eof.md]

### 出力
```
1
0
```


## 関連項目
- [`feof`](feof.md)
- [`ferror`](ferror.md)
- [`rewind`](rewind.md)
