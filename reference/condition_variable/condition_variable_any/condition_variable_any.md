#コンストラクタ (C++11)
```cpp
condition_variable_any();
condition_variable_any(const condition_variable_any&) = delete;
```

##condition_variable_anyオブジェクトの構築
- `condition_variable_any()`デフォルトコンストラクタ。`condition_variable_any`<br/>オブジェクトの初期化を行う
- `condition_variable_any(const condition_variable_any&) = delete`<br/>コピーコンストラクタ。コピー不可。


##例外
この関数は、[`bad_alloc`](/reference/new/bad_alloc.md)例外オブジェクト、もしくは以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- `resource_unavailable_try_again` : native handle型の計算ができない
- `operation_not_permitted` : スレッドがこの操作を実行する権限を持っていない


##例
```cpp
#include <condition_variable>

int main()
{
  std::condition_variable_any cond;
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


