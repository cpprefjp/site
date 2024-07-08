# ユーザー宣言したコンストラクタを持つクラスの集成体初期化を禁止 [P1008R1]
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要
ユーザー宣言されたコンストラクタをもつクラスを、集成体初期化によってコンストラクタを回避してオブジェクト構築できてしまっていた技法を禁止する。

C++17まで、集成体初期化ができる型として、「`delete`／`default`宣言されたコンストラクタを持つ型」が許可されてしまっていたが、これを禁止する。これによって一部、以前のバージョンからの互換性がなくなる。


### delete宣言されているコンストラクタを回避した構築
```cpp example
struct X {
  X() = delete;
};

int main() {
  // デフォルト構築。
  // デフォルトコンストラクタがdelete宣言されているのでコンパイルエラー
  X x1;   // C++17:NG C++20:NG

  // 集成体初期化。
  // delete宣言されているコンストラクタを回避して構築できてしまっていた
  X x2{}; // C++17:OK C++20:NG
}
```

### privateなdefault宣言コンストラクタを回避した構築
```cpp example
struct X {
private:
  X() = default;
};

int main() {
  // デフォルト構築。
  // デフォルトコンストラクタがprivateなのでコンパイルエラー
  X x1;   // C++17:NG C++20:NG

  // 集成体初期化。
  // privateなデフォルトコンストラクタを回避して構築できてしまっていた
  X x2{}; // C++17:OK C++20:NG
}
```

### default宣言コンストラクタをもっているのに集成体初期化によるメンバ変数初期化
```cpp example
struct X {
  int i{4};
  X() = default;
};

int main() {
  // コンストラクタ呼び出し。
  // 一致するコンストラクタがないためコンパイルエラー
  X x1(3); // C++17:NG C++20:NG

  // 集成体初期化。
  // デフォルトコンストラクタがあるのに集成体初期化できてしまっていた
  X x2{3}; // C++17:OK C++20:NG
}
```

### コンストラクタがexplicitかどうかでの集成体初期化の挙動の違い
```cpp example
struct X {
  X() = delete;
};

struct Y {
  explicit Y() = delete;
};

int main() {
  // explicitなコンストラクタだけは集成体初期化で回避できなかった
  X x{}; // C++17:OK C++20:NG
  Y y{}; // C++17:NG C++20:NG
}
```


### コンストラクタ宣言を分けた場合の挙動の違い
```cpp example
struct X {
  int i;
  X() = default;
};

struct Y {
  int i;
  Y();
};
Y::Y() = default;

int main() {
  // YはXとは違って集成体とは見なされずコンパイルエラーだった
  X x{4}; // C++17:OK C++20:NG
  Y y{4}; // C++17:NG C++20:NG
}
```


## 仕様
- 集成体初期化できる型の条件として、
    - 「ユーザー提供 (user-provided) されたコンストラクタを持たないこと」となっていたが、これを「ユーザー宣言 (user-declared) されたコンストラクタを持たないこと」に変更
    - 「`explicit`なコンストラクタを持たないこと」という条件を削除


## 参照
- [P1008R1 Prohibit aggregates with user-declared constructors](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1008r1.pdf)