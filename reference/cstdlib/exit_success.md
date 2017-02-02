#EXIT_SUCCESS
* cstdlib[meta header]
* macro[meta id-type]

```cpp
#define EXIT_SUCCESS implementation-defined
```

##概要
`EXIT_SUCCESS`は、プログラムが正常終了したことを表す終了コードである。

このマクロは整数の定数値に対する別名として定義される。

このマクロの値は、[`exit()`](exit.md)関数や[`quick_exit()`](quick_exit.md)関数の引数として指定する。そうすることで、プログラムが正常終了したことを、ホスト環境に伝えられる。このマクロのほかに、`0`を指定して正常終了とすることもできる。


##例
```cpp
#include <cstdlib>

int main()
{
  std::exit(EXIT_SUCCESS);
}
```
* EXIT_SUCCESS[color ff0000]
* std::exit[link exit.md]

##出力
```
```


