# 可変引数テンプレートでfriend宣言をできるようにする [P2893R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、可変引数テンプレートのパラメータパックを、friend宣言に指定できるようになる。

```cpp
template <class... Ts>
class Foo {
  friend Ts...; // C++26: OK
};
```

この指定により、パラメータパック`Ts`内のすべての型をfriend指定したことになる。


### Passkeyイディオム
Passkeyイディオムを使用すると、メンバ関数ごとにアクセス許可をだすことができる。以下のプログラムでは、クラス`C`はクラス`A`にfriend関係を付与している。そのため、`A::m()`は`C`の内部構造すべてにアクセスできる。

しかし、`C`はPasskeyイディオムを使用して、`intentionalA()`と`intentionalB()`へのアクセスも許可している。`Passkey<B>`クラスには、フレンド関係の`B`のみがアクセスできるプライベートコンストラクタがあるため、`B`のみが`Passkey<B>`のインスタンスを作成できる。最初の引数として`Passkey<B>`のインスタンスを指定せずに`intentionalB()`を呼び出すことはできない。そのため、`intentionalB()`は公開メンバ関数ではあるが、`B`からのみ呼び出すことができる。

```cpp
template<class T>
class Passkey {
  friend T;
  Passkey() {}
};

class A;
class B;

class C {
  friend A;
private:
  void internal();
public:
  void intentionalA(Passkey<A>);
  void intentionalB(Passkey<B>);
};

class A {
  void m(C& c) {
    c.internal();       // OK
    c.intentionalA({}); // OK
    c.intentionalB({}); // エラー！Passkey<B>のコンストラクタにアクセスできない
  }
};

class B {
  void m(C& c) {
    c.intentionalB({}); // OK
  }
};
```

C++26ではこのイディオムを拡張し、複数のクラスに同時にアクセス許可を付与できるようになる。

```cpp
template<class... Ts>
class Passkey {
  friend Ts...;
  Passkey() {}
};

class C {
public:
  // Blarg, Blip, Bazクラスからのみ呼び出せる
  void intentional(Passkey<Blarg, Blip, Baz>);
};
```


### 派生クラスへのCRTPアクセス
クラステンプレートから継承する際、派生クラスの型を基底クラスのテンプレート引数として指定するイディオムが「CRTP (Curiously Recurring Template Pattern、奇妙に再帰したテンプレートパターン)」と呼ばれている。このイディオムでも、可変引数テンプレートでfriend宣言できるようになることが有用である。

派生クラスの一部APIが基底クラスで必要となる場合があり、基底クラスでのみ必要であるためそのAPIはprivateにして、基底クラスにのみアクセスを許可したいことがある。そういった状況で、C++26での可変引数テンプレートでのfriend宣言が必要になる。

```cpp
template<class Crtp, class MsgT>
class Receiver {
  void receive(MsgT) {
    static_cast<Crtp*>(this)->private_ += 1;
  }
};

template<class... MsgTs>
struct Dispatcher :
  public Receiver<Dispatcher<MsgTs...>, MsgTs>... // OK。可変引数テンプレートでの継承
{
  using Receiver<Dispatcher, MsgTs>::Receiver...;  // OK。可変引数テンプレートでのusing宣言
  friend Receiver<Dispatcher, MsgTs>...; // C++26: OK

private:
  int private_;
};
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)


## 参照
- [P2893R3 Variadic friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2893r3.html)

