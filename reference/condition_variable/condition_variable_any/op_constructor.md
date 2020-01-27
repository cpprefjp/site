# コンストラクタ
* condition_variable[meta header]
* std[meta namespace]
* condition_variable_any[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
condition_variable_any();                                       // (1)
condition_variable_any(const condition_variable_any&) = delete; // (2)
```

## 概要
- (1) : デフォルトコンストラクタ。`condition_variable_any`オブジェクトの初期化を行う
- (2) : コピーコンストラクタ。コピー不可。これによってムーブも不可。


## 例外
この関数は、[`bad_alloc`](/reference/new/bad_alloc.md)例外オブジェクト、もしくは以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- `resource_unavailable_try_again` : 制限により、非メモリリソースの初期化ができなかった
- `operation_not_permitted` : スレッドがこの操作を実行する権限を持っていない


## 例
```cpp example
#include <condition_variable>

int main()
{
  std::condition_variable_any cond;
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
    - 2012までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照
- [LWG Issue 2092. Vague Wording for `condition_variable_any`]
    - C++11では`resource_unavailable_try_again`エラーの理由が「native handleの計算ができなかった」というものだった。しかし、このクラスはnative handleを持っていることがpublicインタフェースになっていないため、C++14で「制限により、非メモリリソースの初期化ができなかった」という表現に修�。

