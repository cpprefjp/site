# ferror
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int ferror(FILE* stream);
}
```
* FILE[link file.md]

## 概要
ファイルストリームがエラー状態かを判定する。


## 戻り値
エラーが発生している場合は`0`以外を、そうでなければ`0`を返す。


## 備考
- エラー状態は、[`clearerr()`](clearerr.md)または[`rewind()`](rewind.md)を呼び出すまで保持される
- 入出力関数が失敗した場合、その原因がエラーとファイル終端のどちらであるかは、この関数と[`feof()`](feof.md)で判別する


## 例
```cpp example
#include <cstdio>

int main()
{
  // 読み込み専用で開いたストリームへ書き込みを行う
  std::FILE* fp = std::fopen("test.txt", "w");
  std::fclose(fp);
  fp = std::fopen("test.txt", "r");

  std::fputc('A', fp);
  std::printf("%d\n", std::ferror(fp) != 0);

  std::fclose(fp);
}
```
* std::ferror[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputc[link fputc.md]
* std::printf[link printf.md]
* std::FILE[link file.md]

### 出力
```
1
```


## 関連項目
- [`feof`](feof.md)
- [`clearerr`](clearerr.md)
- [`perror`](perror.md)
