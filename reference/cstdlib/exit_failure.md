#EXIT_FAILURE
* cstdlib[meta header]
* macro[meta id-type]

```cpp
#define EXIT_FAILURE implementation-defined
```

##概要
`EXIT_FAILURE`は、プログラムが異常終了したことを表す終了コードである。

このマクロは整数の定数値に対する別名として定義される。

このマクロの値は、[`exit()`](exit.md)関数や[`quick_exit()`](quick_exit.md)関数の引数として指定する。そうすることで、プログラムが異常終了したことを、ホスト環境に伝えられる。このマクロのほかに、`0`以外の整数値を指定して異常終了とすることもできる。


##例
```cpp
#include <cstdlib>

int main()
{
  std::exit(EXIT_FAILURE);
}
```

##出力
```
```


