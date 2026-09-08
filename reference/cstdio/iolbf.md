# _IOLBF
* cstdio[meta header]
* macro[meta id-type]

```cpp
#define _IOLBF unspecified
```
* unspecified[italic]

## 概要
入出力を行バッファリングすることを指定するための整数定数。

改行文字が書き込まれたときに入出力が行われる。端末に接続されたストリームの既定のバッファリング方式となることが多い。

[`setvbuf()`](setvbuf.md)関数の`mode`引数として指定する。値は処理系定義の整数定数式であり、`_IOFBF`・`_IOLBF`・`_IONBF`は互いに異なる値をもつ。


## 例
```cpp example
#include <cstdio>

int main()
{
  char buffer[BUFSIZ];

  std::FILE* fp = std::fopen("test.txt", "w");
  int result = std::setvbuf(fp, buffer, _IOLBF, sizeof(buffer));
  std::printf("%d\n", result);

  std::fputs("Hello\n", fp);
  std::fclose(fp);
}
```
* _IOLBF[color ff0000]
* std::setvbuf[link setvbuf.md]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* BUFSIZ[link bufsiz.md]

### 出力
```
0
```


## 関連項目
- [`setvbuf`](setvbuf.md)
- [`setbuf`](setbuf.md)
