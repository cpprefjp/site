# iter_move
* iterator[meta header]
* cpo[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  namespace ranges {
    inline namespace /*unspecified*/ {

      inline constexpr /*unspecified*/ iter_move = /*unspecified*/;
    }
  }
}
```

## 概要

`iter_move`はイテレータを1つ受け取り、そのイテレータの参照する要素の値を移動（`move`）するカスタマイゼーションポイントオブジェクトである。

## 効果

`iter_move(i)`のように呼び出された時、以下のいずれかと等価

1. 引数`i`の型がクラス型であるか列挙型であり、`std::ranges::iter_move`（本CPO）の宣言を含まず下記の`iter_move`関数宣言を含むコンテキストで、`iter_move(i)`が呼び出し可能ならば`iter_move(i)`
   ```cpp
   void iter_move();
   ```

2. `*i`が有効であり、`*i`の結果が左辺値であるならば`std::move(*i)`

3. `*i`が有効であり、`*i`の結果が右辺値であるならば`*i`

4. それ以外の場合、呼び出しは不適格。


1のケースの場合に、呼び出される`iter_move()`が移動しようとする値を変更する場合、プログラムは不適格（ただし、コンパイルエラーとならない可能性がある）。

## 戻り値

引数`i`の指す要素の（右辺値）参照、もしくは`i`の指す要素を移動した値

## 例外

上記「効果」節のそれぞれのケース毎に

1. 呼び出される`iter_move()`が例外を投げるかに従う
2. 引数`i`についての`*`演算子が例外を投げるかに従う
3. 引数`i`についての`*`演算子が例外を投げるかに従う

## 定数式に評価される条件

1. 呼び出される`iter_move()`が定数評価可能かに従う
2. 引数`i`についての`*`演算子が定数評価可能かに従う
3. 引数`i`についての`*`演算子が定数評価可能かに従う

## カスタマイゼーションポイント

1. 引数`i`の型と同じ名前空間で、もしくは[*Hidden friends*](/article/lib/hidden_friends.md)として、非メンバ`iter_move()`関数を定義しておく
2. --
3. --


## 備考

一見するとこのCPOは冗長であるように見えるが、イテレータ`i`についての`*i`の結果が*prvalue*を返す（イテレータの要素型`T`のオブジェクトをそのまま返す）場合に不要なキャストを回避することでより効率的なムーブ（[コピー省略](/lang/cpp17/guaranteed_copy_elision.md)による直接構築）を行うことができる。

イテレータを利用したジェネリックなアルゴリズムの実装においてイテレータの要素をムーブする必要がある場合には、`std::move(*i)`のようなコードを直接書くよりもこのCPOを使用したほうがより効率的になりうる。

## 例

```cpp example
#include <iterator>
#include <vector>
#include <iostream>

struct I {
  int n = 0;

  // Hidden friendsとして定義、prvalueを返す
  friend auto iter_move(I& self) -> I {
    return std::move(self);
  }
  
  I& operator*();
};

int main() {
  I i = {20};

  // ケース1の呼び出し
  I i2 = std::ranges::iter_move(i);

  std::cout << i2.n << std::endl;
  
  std::vector vec = {1, 2, 3, 4};
  
  // ケース2の呼び出し
  int n = std::ranges::iter_move(vec.begin());
  
  std::cout << n << std::endl; 
}
```
* iter_move[color ff0000]

### 出力
```
20
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 4

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
