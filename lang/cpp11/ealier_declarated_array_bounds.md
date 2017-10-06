# 宣言時に要素数を指定した配列オブジェクトの、定義時の要素数を規定
* cpp11[meta cpp]

## 概要
`static`メンバや`extern`として宣言した配列を定義した際、宣言時に指定した要素数として定義されることが規定された。

```cpp
extern int x[10];
struct S {
  static int y[10];
};

int x[];    // 要素数は10
int S::y[]; // 要素数は10
```

これが規定されるまでは、定義時の要素数は未規定だった。


## 参照
- [CWG Issue 619. Completeness of array types](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#619)

