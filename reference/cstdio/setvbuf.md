# setvbuf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int setvbuf(FILE* stream, char* buf, int mode, size_t size);
}
```
* FILE[link file.md]
* size_t[link /reference/cstddef/size_t.md]

## 概要
バッファリングの方式を指定して、ファイルストリームが使用する入出力バッファを設定する。

`mode`には以下のいずれかを指定する。

| 値 | 説明 |
|----|------|
| [`_IOFBF`](iofbf.md) | 完全バッファリング。バッファが満たされたときに入出力を行う |
| [`_IOLBF`](iolbf.md) | 行バッファリング。改行文字が書き込まれたときに入出力を行う |
| [`_IONBF`](ionbf.md) | バッファリングを行わない |

`buf`がヌルポインタでない場合、その領域が`size`バイトのバッファとして使用される。ヌルポインタの場合は、処理系がバッファを確保する。


## 戻り値
成功した場合は`0`を、`mode`が不正な値であるなどして失敗した場合は`0`以外を返す。


## 備考
- この関数は、ストリームを開いた後、入出力操作を行う前に呼び出さなければならない
- `buf`として渡す配列は、ストリームを閉じるまで生存していなければならない


## 例
```cpp example
#include <cstdio>

int main()
{
  char buffer[BUFSIZ];

  std::FILE* fp = std::fopen("test.txt", "w");

  // 行バッファリングを指定する
  int result = std::setvbuf(fp, buffer, _IOLBF, sizeof(buffer));
  std::printf("%d\n", result);

  std::fputs("Hello\n", fp);
  std::fclose(fp);
}
```
* std::setvbuf[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* BUFSIZ[link bufsiz.md]
* _IOLBF[link iolbf.md]

### 出力
```
0
```


## 関連項目
- [`setbuf`](setbuf.md)
- [`_IOFBF`](iofbf.md)
- [`_IOLBF`](iolbf.md)
- [`_IONBF`](ionbf.md)
