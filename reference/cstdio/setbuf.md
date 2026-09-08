# setbuf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void setbuf(FILE* stream, char* buf);
}
```
* FILE[link file.md]

## 概要
ファイルストリームが使用する入出力バッファを設定する。

`buf`がヌルポインタでない場合は[`setvbuf()`](setvbuf.md)`(stream, buf,` [`_IOFBF`](iofbf.md)`,` [`BUFSIZ`](bufsiz.md)`)`と、ヌルポインタの場合は[`setvbuf()`](setvbuf.md)`(stream, nullptr,` [`_IONBF`](ionbf.md)`, 0)`と等価である。


## 戻り値
なし。

設定に失敗したかどうかを知る必要がある場合は、[`setvbuf()`](setvbuf.md)を使用する。


## 備考
- この関数は、ストリームを開いた後、入出力操作を行う前に呼び出さなければならない
- `buf`として渡す配列は、[`BUFSIZ`](bufsiz.md)個以上の要素をもち、ストリームを閉じるまで生存していなければならない


## 例
```cpp example
#include <cstdio>

int main()
{
  char buffer[BUFSIZ];

  std::FILE* fp = std::fopen("test.txt", "w");

  // 独自に用意したバッファを使用する
  std::setbuf(fp, buffer);
  std::fputs("Hello", fp);

  std::fclose(fp);
  std::printf("done\n");
}
```
* std::setbuf[color ff0000]
* std::fopen[link fopen.md]
* std::fclose[link fclose.md]
* std::fputs[link fputs.md]
* std::printf[link printf.md]
* std::FILE[link file.md]
* BUFSIZ[link bufsiz.md]

### 出力
```
done
```


## 関連項目
- [`setvbuf`](setvbuf.md)
- [`BUFSIZ`](bufsiz.md)
