#Pragma演算子
* cpp11[meta cpp]

##概要
C99互換として、Pragma演算子が導入された。

Pragma演算子は、マクロ内で処理系定義の機能を使用するための機能である。処理系定義の機能を使用するために、従来はPragmaディレクティブを使用してきたが、その機能はマクロ内では使用できない。

Pragma演算子は、`_Pragma(文字列リテラル)`の形式で、処理系定義の機能を文字列リテラルとして引数指定して使用する。


##仕様
Pragma演算子は、単項演算子の形式で、以下の構文を持つ：

```
_Pragma (文字列リテラル)
```

これは、以下のように処理される：

- 文字列リテラルの`L`プレフィックスを削除する
- 前後のダブルクォーテーションを削除する
- エスケープシーケンス`\"`をダブルクォーテーションに置換する
- エスケープシーケンス`\\`をバックスラッシュひとつに置換する

処理結果のプリプロセッサトークンのシーケンスは、Pragmaディレクティブに指定した場合と同様に処理される。


##例
```cpp
#include <iostream>

// OpenMPの言語拡張を使用して、for文を並列実行する
#define OMP_PARALLEL_FOR _Pragma("omp parallel for")

// 以下のように、Pragmaディレクティブでは書けない
//#define OMP_PARALLEL_FOR #pragma omp parallel for

int main()
{
  constexpr int N = 5;
  int a[N] = {1, 2, 3, 4, 5};
  int b[N] = {1, 2, 3, 4, 5};
  int c[N] = {};

  // OMP_PARALLEL_FORは、 #pragma omp parallel for に展開される
  OMP_PARALLEL_FOR
  for (int i = 0; i < N; ++i) {
    c[i] = a[i] + b[i];
  }

  for (int i = 0; i < N; ++i) {
    std::cout << c[i] << std::endl;
  }
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
2
4
6
8
10
```

##参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)

