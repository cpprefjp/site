# Pragma演算�
* cpp11[meta cpp]

## 概要
C99互換として、Pragma演算�が導入された。

Pragma演算�は、マク�内で処理系定義の機能を使用するための機能である。処理系定義の機能を使用するために、従来はPragmaディレクティブを使用してきたが、その機能はマク�内では使用できない。

Pragma演算�は、`_Pragma(文�列リテラル)`の形式で、処理系定義の機能を文�列リテラルとして引数指定して使用する。


## 仕様
Pragma演算�は、単項演算�の形式で、以下の構文を持つ：

```
_Pragma (文�列リテラル)
```

これは、以下のように処理される：

- 文�列リテラルの`L`プレフィックスを削除する
- 前後のダブルクォーテーションを削除する
- エスケープシーケンス`\"`をダブルクォーテーションに置換する
- エスケープシーケンス`\\`をバックスラッシュひとつに置換する

処理結果のプリプ�セッサトークンのシーケンスは、Pragmaディレクティブに指定した場合と同様に処理される。


## 例
```cpp example
#include <iostream>

// OpenMPの言語拡張を使用して、for文を並列実行する
# define OMP_PARALLEL_FOR _Pragma("omp parallel for")

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

### 出力
```
2
4
6
8
10
```

## 参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)

