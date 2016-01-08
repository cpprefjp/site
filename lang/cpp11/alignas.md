#alignas
* cpp11[meta cpp]

##概要
`alignas()`は、コンパイラに対し変数をメモリ上の特定の位置に配置（アライメント）するように要求するキーワードである。「アライン アズ (align as)」と読む。

例えば4バイト境界の位置にアライメントした場合、変数は4の倍数のアドレスに配置され、8バイト境界の位置にアライメントした場合、変数は8の倍数のアドレスに配置される。


##仕様
`alignas()` は変数宣言やクラスのメンバ変数宣言に使用するか、構造体やクラスの宣言時に使用できる。

変数やクラスのメンバ変数宣言時に使用した場合、宣言した変数をアライメントする。

```cpp
alignas(32) int i; //32バイト境界にアライメントする
```

構造体やクラスの宣言時に使用した場合、その型のインスタンス全てをアライメントする。

```cpp
struct alignas(32) hoge {
};

hoge a; //32バイト境界にアライメントする
hoge b; //32バイト境界にアライメントする
```

- `alignas(定数)`は、定数の値でアライメントをする。0または0として評価される値を指定したときは何も起きない。
- `alignas(型)`は、`alignas(alignof(型))`と等価である。ある型 A のアライメントを別の型 B にも適用したいとき`alignas(A) B hoge;`のように書ける。

ただしGCC 4.9では`alignas(0)`は使えず、下記のエラーを出力する。

```
error: requested alignment is not a positive power of 2
```


##例
```cpp
#include <iostream>

struct test {
  alignas(1) int i1, i1_n;
  alignas(2) int i2, i2_n;
  alignas(4) int i4, i4_n;
  alignas(8) int i8, i8_n;
  alignas(16) int i16, i16_n;
  alignas(8) alignas(16) int i8_16, i8_16_n;
};

int distance(void *a, void *b)
{
  return reinterpret_cast<int>(a) - reinterpret_cast<int>(b);
}

int main()
{
  //Zero is ill-formed in GCC 4.9.
  //alignas(0) test a;

  test t;

  std::cout <<
    "alignas(1) int i1:   " << distance(&t.i1_n, &t.i1) << std::endl <<
    "alignas(2) int i2:   " << distance(&t.i2_n, &t.i2) << std::endl <<
    "alignas(4) int i4:   " << distance(&t.i4_n, &t.i4) << std::endl <<
    "alignas(8) int i8:   " << distance(&t.i8_n, &t.i8) << std::endl <<
    "alignas(16) int i16: " << distance(&t.i16_n, &t.i16) << std::endl;

  std::cout <<
    "alignas(8) alignas(16) int i8_16: " << 
    distance(&t.i8_16_n, &t.i8_16) << std::endl;

  return 0;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
alignas(1) int i1:   4
alignas(2) int i2:   4
alignas(4) int i4:   4
alignas(8) int i8:   8
alignas(16) int i16: 16
alignas(8) alignas(16) int i8_16: 16
```


##この機能が必要になった背景・経緯
下記の理由などにより、変数のアライメントをする必要がある。

* メモリアクセスの最適化を行う
* ハードウェアの制約を満たす
* 同じアドレスに異なるデータを格納する

C++03で変数のアライメントを行うにはコンパイラの拡張機能を利用するしかなく、コンパイラごとに異なる記述を行う必要があったが、C++11ではどのコンパイラでも同じ記述でアライメントができる。


##検討されたほかの選択肢
N2341 からはわからない、恐らくないと思われる。


##関連項目
- [`alignof`](/lang/cpp11/alignof.md)


##参照
- [N2341 Adding Alignment Support to the C++ Programming Language / Wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2341.pdf)

