# 定数式での`dynamic_cast`、多態的な`typeid`を許可 [P1327R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20より、`constexpr`関数内（定数式）で`dynamic_cast`および多態的な型に対する`typeid`を使用することができるようになる。

ただし、定数式での`dynamic_cast/typeid`の実行が例外を投げる場合は定数式で実行可能ではない。そのコンテキストが定数式で実行されなければならない所（`constexpr`変数の初期化式など）ではない場合、その実行は実行時まで延期される。

## 例
```cpp example
struct base {
  virtual int f() const = 0;
};

struct derived1 : public base {
  constexpr int f() const override {
    return 10;
  }
};

struct derived2 : public base {
  constexpr int f() const override {
    return 20;
  }
};

struct base2 {
  virtual int g() const = 0;
};

struct derived3 : public base, public base2 {
  constexpr int f() const override {
    return 30;
  }
  
  constexpr int g() const override {
    return 30;
  }
};

constexpr auto& get_typeinfo(const base* p) {
  // コンパイル時に動的型のtype_infoを取得する
  return typeid(*p);
}

constexpr int side_cast(const base* p) {
  // コンパイル時サイドキャスト
  const base2* b2 = dynamic_cast<const base2*>(p);
  return b2->g();
}

int main() {
  constexpr derived1 d1{};
  constexpr derived2 d2{};

  // typeidの例
  constexpr auto& tid1 = get_typeinfo(&d1);
  constexpr auto& tid2 = get_typeinfo(&d2);

  std::cout << std::boolalpha;
  std::cout << (tid1 == tid2) << std::endl;

  // dynamic_castの例
  constexpr derived3 d3{};
  constexpr int n = side_cast(&d3);

  static_assert(n == 30);
  std::cout << n << std::endl;
}
```
* typeid[color ff0000]
* dynamic_cast[color ff0000]

### 出力
```
false
30
```

## この機能が必要になった背景・経緯

[`std::error_category`](/reference/system_error/error_category.md)に新しい仮想関数やメンバを追加する提案が提出されていたが、ABIを破損する（クラスレイアウトが変更されてしまう）ことから採択されなかった。

代替案として、`std::error_category`を派生させた別の型を導入して、その型に対して変更を加えるという方法が検討された。その場合、[`std::error_code`](/reference/system_error/error_code.md)では、`dynamic_cast/typeid`を使用して新旧`error_category`のどちらを利用しているのかをチェックした上で処理を分ける事になる。

しかしその方法は、`std::error_code`のメンバ関数を`constexpr`にする提案と衝突してしまっていた。`dynamic_cast`および多態的な型に対する`typeid`は定数式で実行可能ではなかったためである。

この提案の採択以前に、C++20にて定数式での仮想関数呼び出しが許可され、コンパイラは定数式においてあるオブジェクトの動的型を追跡し続けるようになっていた。したがって、`dynamic_cast`および多態的な型に対する`typeid`を定数式で利用できない技術的な理由は取り除かれており、これらを定数式で実行できないという制限は緩和されることになった。

## 検討されたほかの選択肢

別の提案（P1328R0）にて`typeinfo`の[`operator==`](/reference/typeinfo/type_info/op_equal.md)も`constexpr`にする事が提案されている。これは当初C++20に導入される予定であったが、実装可能性に関する懸念が提起されその調査に時間がかかったためC++20には間に合わなかった。

その後、実装可能性に関する懸念は払拭されたため、C++23に導入される予定である。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [C++20 定数式からの仮想関数の呼び出しを許可](/lang/cpp20/allow_virtual_function_calls_in_constant_expressions.md)


## 参照

- [P1327R1 Allowing dynamic_cast, polymorphic typeid in Constant Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1327r1.html)
- [P1328R0 Making std::type_info::operator== constexpr](https://wg21.link/P1328)
