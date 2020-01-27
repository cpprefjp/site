# exceptions
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
iostate exceptions() const;         // (1)

void exceptions(iostate except);    // (2)
```

## 概要
例外マスク（特定の状態時に例外を投げる指定）の�定・取得を行う。

## 効果
- (1) -
- (2) 例外マスクを引数 `except` に�定する（`exceptions() == except` となる）。  
    その後、[`clear`](clear.md)`(`[`rdstate`](rdstate.md)`())` を実行する（結果として、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md) 例外が送出される可能性がある）。

## 戻り値
- (1) 現在の例外マスク
- (2) なし


## 例
```cpp example
#include <iostream>
#include <cstddef>

int main()
{
  std::ios str(NULL);
  std::cout << "exceptions = " << str.exceptions() << '\n';
  std::cout << "rdstate = " << str.rdstate() << '\n';
  try {
    str.exceptions(std::ios_base::failbit | std::ios_base::badbit);
  } catch (std::ios_base::failure& e) {
    std::cout << "exceptions = " << str.exceptions() << '\n';
    std::cout << "rdstate = " << str.rdstate() << '\n';
    std::cout << e.what() << '\n';
  }
  std::cout << "end\n";
}
```
* exceptions()[color ff0000]
* std::ios_base[link ../ios_base.md]
* failbit[link ../ios_base/type-iostate.md]
* badbit[link ../ios_base/type-iostate.md]
* failure[link ../ios_base/failure.md]
* what[link ../ios_base/failure/what.md]
* rdstate[link rdstate.md]

### 出力例
```
exceptions = 0
rdstate = 1
exceptions = 5
rdstate = 1
ios_base::clear: unspecified iostream_category error
end
```

## バージョン
### 言語
- C++98

## 参照
- 状態値の書き込み
    - [`setstate`](setstate.md)
    - [`clear`](clear.md)
- 状態値の�み取り
    - [`rdstate`](rdstate.md)
    - [`good`](good.md)
    - [`eof`](eof.md)
    - [`fail`](fail.md)
    - [`bad`](bad.md)
    - [`operator bool`](op_bool.md)
    - [`operator void*`](op_voidptr.md)
    - [`operator!`](op_not.md)
