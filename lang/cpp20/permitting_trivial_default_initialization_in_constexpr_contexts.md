# constexpr関数内でのトリビアルなデフォルト初期化を許可 [P1331R2]
* cpp20[meta cpp]

## 概要

型`T`の変数を単に`T t;`のように（関数スコープで）初期化した時、`T`がクラス型であり非トリビアルなデフォルトコンストラクタを持っているか、集成体型であり全てのメンバがデフォルトメンバ初期化によって初期化されていれば、`t`は初期化されており値は決定的である。しかし、組み込み型など[トリビアルにデフォルト構築可能](/reference/type_traits/is_trivially_default_constructible.md)な型の場合はその初期化は実装定義であり、その値の読み取りは未定義動作である。

定数式には未定義動作が含まれてはならない事から、`constexpr`関数内のローカル変数が初期化されておらずその関数がコンパイル時に実行された場合、C++17までは不定な値が読み取られているかに関わらずコンパイルエラーとなっていた。

```cpp
constexpr int ng() {
  int n; // トリビアルなデフォルト初期化、組み込み型については値は不定
         // C++17までは定数式ではコンパイルエラー
  
  n = 10;

  return n;
}

constexpr int ok() {
  int n{};  // OK、デフォルト初期化（0）される
  
  n = 10;

  return n;
}
```

C++20からは、このような変数の値が読み取られない限り、定数式で現れる事が許可されるようになる。


## 例

```cpp example
#include <iostream>

template <typename T>
constexpr T copy(const T& other) {
  T t;  // トリビアルなデフォルト初期化
  t = other;

  return t;
}

struct trivial {
  int n;
};

struct non_trivial {
  int n = 100;
};

int main() {
  {
    // 実行時、全てOK
    auto cp1 = copy(10);
    auto cp2 = copy(trivial{});
    auto cp3 = copy(non_trivial{});

    std::cout << cp1 << ", " << cp2.n << ", " << cp3.n << std::endl;
  }

  {
    // コンパイル時、C++20からは全てOK
    constexpr auto cp1 = copy(10);            // C++17まではNG
    constexpr auto cp2 = copy(trivial{});     // C++17まではNG
    constexpr auto cp3 = copy(non_trivial{});

    std::cout << cp1 << ", " << cp2.n << ", " << cp3.n << std::endl;
  }
}
```

### 出力
```
10, 0, 100
10, 0, 100
```

## この機能が必要になった背景・経緯

例のコードのように、`constexpr`関数テンプレート内でローカル変数のトリビアルなデフォルト初期化が行われていると、そこに渡される型によってコンパイルエラーとなるかどうかが変化していた。一方、そのような関数でも、未初期化変数の値の読み取りをしなければ実行時に未定義動作を起こすことはない。

また、この機能に先んじてコンパイル時に`new`式の実行が許可されるようになっていたが、そこでは確保領域の初期化は任意であるため、同じ結果となるコードでもコンパイルできるかどうかが異なっていた。

```cpp
template <typename T>
constexpr T f1(const T& other) {
  auto* t = new T;  // 当初からOK
  *t = other;
  T out = *t; 
  delete t;

  return out;
}

template <typename T>
constexpr T f2(const T& other) {
  T t;  // NG
  t = other; 
  T out = t; 

  return out;
}

int main() {
  constexpr int n1 = f1(10);  // OK
  constexpr int n2 = f2(20);  // NG
}
```

これらのことはコンパイル時と実行時の振る舞いの一貫性を欠いており、特にジェネリックなコードを書く際に問題となっていた。`constexpr`関数は実行時とコンパイル時の両方で実行可能な関数であり、その振る舞いは基本的に実行タイミングによらず一貫している事が期待される。

そのため、トリビアルな型のローカル変数のトリビアルなデフォルト初期化そのものは未定義動作ではなく、その値の読み取りが未定義動作であり、そのような初期化そのものを禁止するのは過度な制限であるとして緩和される事となった。ただし、その値の読み取りは依然として未定義動作であり、定数式で現れてはならない。

## 関連項目

- [可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)

## 参照

- [P1331R2 Permitting trivial default initialization in constexpr contexts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1331r2.pdf)
