# 可変長データを扱うクラスの効率的な`delete`
* cpp20[meta cpp]

## 概要

従来のクラススコープでの`operator delete`オーバーロードにおいて、オーバーロードされた`operator delete`が呼び出されるのはそのクラスのオブジェクトが破棄された後であり、そのオーバーロード内からはそのクラスのオブジェクト（及びメンバ）にアクセスすることはできなかった。

```cpp
#include <iostream>

struct S {
  std::string str;

  // #1 Sのための operator delete オーバーロード
  void operator delete(void* p) {
    // Sのオブジェクトは破棄済みのため、未定義動作となる
    const S& self = *p;       // UB
    std::cout << self->str;   // UB

    // メモリ領域の解放
    ::operator delete(p);
  }
};

int main() {
  S* p = new S{};

  // Sのデストラクタ呼び出しの後#1が呼び出される
  delete p;
}
```

`delete`式は指定されたポインタの指しているオブジェクトを破棄した後にそのオブジェクトが占めていたメモリ領域を解放するが、`operator delete`のオーバーロードはオブジェクト破棄後のメモリ領域解放のみを担うため、`operator delete`のオーバーロードが呼ばれた時点でその対象の領域上のオブジェクトは生存期間を終えている。

C++20から、第ニ引数に[`std::destroying_delete_t`](/reference/new/destroying_delete_t.md)を取るように`operator delete`をオーバーロードすることで、`delete`式の行う全ての振る舞いをハンドリングできるようになり、`operator delete`のオーバーロード内から`delete`対象のオブジェクトに安全にアクセスすることができる。

```cpp
#include <iostream>
#include <new>
#include <memory>

struct S {
  std::string str;

  // #1 Sのための operator delete オーバーロード
  void operator delete(S* p, std::destroying_delete_t) {
    // pの指すオブジェクトはデストラクタ呼び出し前のため、安全に参照できる
    const S& self = *p;     // ok
    std::cout << self.str;  // ok

    // デストラクタ呼び出しをしなければならない
    std::destroy_at(p);
    // メモリ解放
    ::operator delete(p);
  }
};

int main() {
  S* p = new S{"test"};

  // Sのデストラクタは呼ばれずに#1が呼び出される
  delete p;
}
```
* std::destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]

このように、`std::destroying_delete_t`を取る`operator delete`のオーバーロードのことを*destroying operator delete*と呼ぶ。*destroying operator delete*においては、`delete`式が行う全てのことをユーザーが行う必要がある。

## 仕様

クラススコープで定義された`operator delete()`で、第二引数が`std::destroying_delete_t`であるものを*destroying operator delete*と呼ぶ。クラス`C`に対する*destroying operator delete*の第一引数は`C*`でなければならず、その2点以外は通常の`operator delete`オーバーロードの制約に従う。

```cpp
struct S {
  // これらの宣言はいずれも、destroying operator deleteではない（コンパイルエラーとなる）
  void operator delete(void*, std::destroying_delete_t);      // 第一引数はS*
  void operator delete(S*, auto);                             // 第二引数は std::destroying_delete_t
  int* operator delete(S*, std::destroying_delete_t);         // 戻り値はvoid
  virtual void operator delete(S*, std::destroying_delete_t); // 仮想関数にできない
};
```

単一オブジェクトに対する`delete`式の実行に伴う`operator delete`の探索の結果、その候補の中に*destroying operator delete*が含まれている場合、*destroying operator delete*ではない`operator delete`は候補から外れる。

```cpp
struct S {
  // destroying operator delete
  void operator delete(S*, std::destroying_delete_t);

  // destroying operator deleteが定義されている限り、こちらが呼び出されることはない
  void operator delete(void*);
};
```

ただし、配列に対する`delete`式の場合は、*destroying operator delete*は考慮されない。

```cpp
struct S {
  // #1 destroying operator delete
  void operator delete(S* p, std::destroying_delete_t) {
    std::cout << "S::operator delete()\n";

    std::destroy_at(p);
    ::operator delete(p);
  }
};

int main() {
  S* p = new S[1]{};

  // #1は呼び出されず、要素ごとに破棄された後で配列の領域が解放される
  delete[] p;
}
```

また、配列板の`operator delete[]`を*destroying operator delete*としてオーバーロードすることもできない。

```cpp
struct S {
  void operator delete[](S* p, std::destroying_delete_t); // ng
};
```

単一オブジェクトに対する`delete`式においてそのオブジェクトの静的型と動的型が一致しない場合（つまり、基底クラスのポインタから派生クラスのオブジェクトを`delete`しようとする場合など）、その静的型はその動的型の基底クラスである必要があり両方の型に仮想デストラクタが必要となるが、*destroying operator delete*が`operator delete`として使用される場合にはその必要はない。したがって、*destroying operator delete*が使用されない場合に`delete`式が指定されたポインタの指す最も派生したオブジェクトを削除せず未定義動作になるような場合（仮想デストラクタの定義忘れなど）でも、*destroying operator delete*が使用された場合は未定義動作とならない（ただし、呼び出された*destroying operator delete*がそのオブジェクトを正しく破棄しない場合は未定義動作となりうる）。

*destroying operator delete*が`operator delete`として使用される`delete`式の実行において、`delete`式は`delete`対象オブジェクトのデストラクタを呼び出さないで`operator delete`を呼び出す。また、その際の*destroying operator delete*の第二引数（`std::destroying_delete_t`に対応する引数）に渡される値は未規定。

## 例

### 可変サイズクラスの`delete`

```cpp example
#include <iostream>
#include <string_view>
#include <string>
#include <new>
#include <memory>
#include <cstring>

class inlined_fixed_string {
  size_t length;

  inlined_fixed_string(size_t size, const char *data)
    : length(size)
  {
    // 自身の後ろにある領域に文字列をコピーする
    // P0593R6の効果によって、charオブジェクトの生存期間が自動開始される（C++20以降）
    std::memcpy(this + 1, data, size);
  }

public:
  inlined_fixed_string() = delete;

  auto size() const -> std::size_t {
    return length;
  }

  auto view() const -> std::string_view {
    // thisの後ろにはlength個のcharオブジェクトが生存期間内にあるため、このreinterpret_castは問題ない
    return { reinterpret_cast<const char*>(this + 1), this->size() };
  }

  // std::stringから構築するファクトリ関数
  static auto Make(const std::string& str) -> inlined_fixed_string* {
    // 自身の末尾に固定長（実行時可変長）の文字列用領域を確保する
    const std::size_t full_size = sizeof(inlined_fixed_string) + str.length() + 1;

    // パディングしたサイズでメモリの確保
    // new式ではなくグローバルnew演算子の呼出
    auto* p = ::operator new(full_size);

    // ログ出力
    std::cout << "inlined_fixed_string::Make() : " << full_size <<" byte allocate.\n";

    // 確保したメモリ領域にplacement newして構築
    // コンストラクタ内で文字列をコピー
    return ::new(p) inlined_fixed_string(str.length() + 1, str.c_str());
  }

  // 確保した領域を含めてdelete
  void operator delete(inlined_fixed_string* p, std::destroying_delete_t) {
    // 末尾領域の長さを取得
    const std::size_t full_size = sizeof(inlined_fixed_string) + p->length;

    // デストラクタ呼び出し
    std::destroy_at(p);

    // char（トリビアルに破棄可能な）型はデストラクタ呼び出しを省略可能
    std::ranges::destroy(p + 1, p + 1 + p->length + 1);

    // メモリ解放
    ::operator delete(p, full_size);
    
    // ログ出力
    std::cout << "inlined_fixed_string::operator delete() : " << full_size <<" byte deallocate.\n";
  }
};

int main() {
  std::string str = "C++20 destroying operator delete test.";
  auto* p = inlined_fixed_string::Make(str);

  std::cout << p->view() << "\n";

  delete p;
}
```
* destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]
* std::ranges::destroy[link /reference/memory/ranges_destroy.md]


#### 出力

```
inlined_fixed_string::Make() : 47 byte allocate.
C++20 destroying operator delete test.
inlined_fixed_string::operator delete() : 47 byte deallocate.
```

### 正しいデストラクタへのディスパッチ

```cpp example
#include <iostream>
#include <new>

// 仮想デストラクタを定義しない基底クラス
struct base {
  int kind = 0;

  // destroying operator delete宣言 #1
  void operator delete(base* p, std::destroying_delete_t);
};

struct derived1 : base {
  derived1() : base{1} {}
};

struct derived2 : base {
  derived2() : base{2} {}
};

// #1に対応する定義
void base::operator delete(base* p, std::destroying_delete_t) {

  switch(p->kind) {
    case 1:
    {
      auto* dp = static_cast<derived1*>(p);
      std::destroy_at(dp);
      ::operator delete(dp);
      std::cout << "destruct derived1\n";
      break;
    }
    case 2:
    {
      auto* dp = static_cast<derived2*>(p);
      std::destroy_at(dp);
      ::operator delete(dp);
      std::cout << "destruct derived2\n";
      break;
    }
    default:
      std::destroy_at(p);
      ::operator delete(p);
      std::cout << "destruct base\n";
  }
}

int main() {
  {
    base* p = new derived1{};
    // #1によってderived1のデストラクタが呼ばれ、メモリが解放される
    delete p;
  }
  {
    base* p = new derived2{};
    // #1によってderived2のデストラクタが呼ばれ、メモリが解放される
    delete p;
  }
}
```
* destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]

#### 出力

```
destruct derived1
destruct derived2
```

## この機能が必要になった背景・経緯
（執筆中）

## 検討されたほかの選択肢
（執筆中）

## 関連項目

- [`std::destroying_delete_t`](/reference/new/destroying_delete_t.md)

## 参照

- [P0722R3 Efficient sized delete for variable sized classes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0722r3.html)
- [P0722R1 Efficient sized delete for variable sized classes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0722r1.html)
