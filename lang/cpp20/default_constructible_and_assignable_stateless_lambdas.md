# 状態を持たないラムダ式を、デフォルト構築可能、代入可能とする [P0624R2]
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要

C++17まではラムダ式の生成するクロージャ型に定義される特殊メンバ関数はコピー/ムーブコンストラクタとデストラクタのみだったが、C++20からは状態を持たない、すなわちキャプチャをしていないラムダ式の場合にのみそのクロージャ型はデフォルトコンストラクタと代入演算子を持つようになる。

```cpp
auto l = [](){ return 20;};
using lambda_t = decltype(l);

lambda_t l2{};  // ok、デフォルト構築

l2 = l;             // ok、コピー代入
l2 = std::move(l);  // ok、ムーブ代入


auto lc = [n = 1](){ return n;};
using clambda_t = decltype(lc);

clambda_t lc2{};    // ng、デフォルトコンストラクタはdeleteされている
clambda_t lc3{lc};  // ok、コピー構築

// 共にng、コピー代入演算子はdeleteされている
lc3 = lc;
lc3 = std::move(lc);
```

## 仕様

ラムダ式がキャプチャをしていない場合、そのクロージャ型にはデフォルトコンストラクタとコピー/ムーブ代入演算子が`default`指定で定義される。

ラムダ式がキャプチャをしている場合、そのクロージャ型のデフォルトコンストラクタとコピー代入演算子は`delete`指定で定義される（ムーブ代入演算子は宣言されない）。

```cpp
// キャプチャをしていないラムダ式のクロージャ型は次のようなメンバを持つ
struct closure {
  closure() = default;  // C++20から
  closure(const closure&) = default;
  closure(closure&&) = default;

  closure& operator=(const closure&) = default; // C++20から
  closure& operator=(closure&&) = default;      // C++20から

  auto operator()(params...) const;
};

// キャプチャをしているラムダ式のクロージャ型は次のようなメンバを持つ
struct closure {
  closure() = delete;
  closure(const closure&) = default;
  closure(closure&&) = default;

  closure& operator=(const closure&) = delete;

  auto operator()(params...) const;

  // コピーキャプチャした変数に対応するメンバ変数
  T1 c1;
  T2 c2;
  ...
};
```

## 例

以下の例では、「[評価されない文脈でのラムダ式](./wording_for_lambdas_in_unevaluated_contexts.md)」による仕様を同時に用いている。

### 連想コンテナの比較をカスタマイズする

```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int, decltype([](auto lhs, auto rhs){ return lhs > rhs;})> set{};
  set.insert({1, 2, 4, 3, 0, 10, 9, 7, 5, 6, 8, 1, 5, 10});
  
  for (auto n : set) {
    std::cout << n << "\n";
  }
}
```

### 出力
```
10
9
8
7
6
5
4
3
2
1
0
```

### `std::unique_ptr`にカスタムデリータを設定する

```cpp example
#include <iostream>
#include <memory>

using handle_t = void*;

void close_handle(handle_t*) {
  std::cout << "The handle was closed" << std::endl;
}

handle_t get_handle() {
  static int n{};
  return &n;
}

int main()
{
  handle_t h = get_handle();
  std::unique_ptr<handle_t, decltype([](auto h) {close_handle(h);})> handle{&h};
}
```

### 出力
```
The handle was closed
```

## この機能が必要になった背景・経緯

これまでは、上記の例のように動作をカスタムする関数オブジェクトをテンプレートパラメータで受け取る設計のクラスをカスタマイズするためにラムダ式を用いる場合、そのラムダ式のクロージャオブジェクトをコンストラクタに引き渡す必要があった。

```cpp
// ラムダ式を一度変数に受けてから、コンストラクタに渡す
auto greater = [](auto lhs, auto rhs){ return lhs > rhs;};
std::set<int, decltype(greater)> set{greater};

auto custom_deleater = [](auto h) {close_handle(h);};
std::unique_ptr<handle_t, decltype(custom_deleater)> handle{&h, custom_deleater};
```

これらのクラスは渡された関数オブジェクトの型がデフォルト構築可能であれば内部でデフォルト構築して初期化を行うため、本来はこのようにコンストラクタから渡す必要はない。しかし、C++17までのラムダ式はデフォルトコンストラクタが常に`delete`されていたためそれができなかった。

また、そのように構築したオブジェクトを代入しようとする場合、ラムダ式のクロージャ型の代入演算子が常に`delete`されていたためできなかった。

```cpp
auto greater = [](auto lhs, auto rhs){ return lhs > rhs;};
std::set<int, decltype(greater)> set1{greater}, set2{greater};

set1 = set2;  // C++17まではコンパイルエラー
```

ラムダ式は関数オブジェクトを生成する糖衣構文であるが、これらのことは対応する関数オブジェクトを直接書いた場合と一貫しておらず不便であるため、状態を持たないラムダ式に限ってデフォルト構築と代入が可能になるように変更された。

C++20では同時に[評価されない文脈にラムダ式を書くことができるようになった](./wording_for_lambdas_in_unevaluated_contexts.md)ため、この様な場合にラムダ式のクロージャ型を直接取得し渡すことができ、余計なコードをほとんど削減することができるようになる。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [評価されない文脈でのラムダ式](./wording_for_lambdas_in_unevaluated_contexts.md)

## 参照
- [P0624R2 Default constructible and assignable stateless lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r2.pdf)